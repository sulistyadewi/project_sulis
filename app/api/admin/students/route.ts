import { randomBytes, randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseAdmin";
import { normalizeRole } from "@/lib/authRole";
type CreateStudentBody = {
  name?: unknown;
  gradeLevel?: unknown;
};
function createUsername(name: string, gradeLevel: number) {
  let slug = "";
  for (const character of name.toLowerCase()) {
    const code = character.charCodeAt(0);
    const isLetter = code >= 97 && code <= 122;
    const isNumber = code >= 48 && code <= 57;
    if (isLetter || isNumber) {
      slug += character;
    } else if (slug.length > 0 && !slug.endsWith(".")) {
      slug += ".";
    }
    if (slug.length >= 32) break;
  }
  while (slug.endsWith(".")) {
    slug = slug.slice(0, -1);
  }
  const uniqueCode = randomBytes(3).toString("hex");
  return `${slug || "student"}.kelas${gradeLevel}.${uniqueCode}`;
}
function createPin() {
  return randomInt(100000, 1000000).toString();
}
export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const accessToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "Sesi admin tidak ditemukan." },
      { status: 401 },
    );
  }
  const { data: authData, error: authError } =
    await supabase.auth.getUser(accessToken);
  if (authError || !authData.user) {
    return NextResponse.json(
      { success: false, message: "Sesi admin tidak valid." },
      { status: 401 },
    );
  }
  const { data: adminProfile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single();

  if (profileError || normalizeRole(adminProfile?.role) !== "admin") {
    return NextResponse.json(
      { success: false, message: "Hanya admin yang dapat membuat akun." },
      { status: 403 },
    );
  }

  let body: CreateStudentBody;
  try {
    body = (await request.json()) as CreateStudentBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Format permintaan tidak valid." },
      { status: 400 },
    );
  }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const gradeLevel = Number(body.gradeLevel);
  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      {
        success: false,
        message: "Nama harus terdiri dari 2 sampai 80 karakter.",
      },
      { status: 400 },
    );
  }
  if (!Number.isInteger(gradeLevel) || gradeLevel < 1 || gradeLevel > 12) {
    return NextResponse.json(
      { success: false, message: "Kelas harus berupa angka 1 sampai 12." },
      { status: 400 },
    );
  }
  const username = createUsername(name, gradeLevel);
  const pin = createPin();
  const internalEmail = `${username}@student.local`;
  const { data: createdUser, error: createError } =
    await supabase.auth.admin.createUser({
      email: internalEmail,
      password: pin,
      email_confirm: true,
      app_metadata: { role: "student" },
      user_metadata: {
        full_name: name,
        grade_level: gradeLevel,
        role: "student",
        must_change_password: true,
      },
    });
  if (createError || !createdUser.user) {
    return NextResponse.json(
      {
        success: false,
        message: createError?.message ?? "Akun student gagal dibuat.",
      },
      { status: 500 },
    );
  }
  const { error: insertError } = await supabase.from("profiles").upsert(
    {
      id: createdUser.user.id,
      role: "student",
    },
    { onConflict: "id" },
  );
  if (insertError) {
    await supabase.auth.admin.deleteUser(createdUser.user.id);
    return NextResponse.json(
      {
        success: false,
        message: `Profil student gagal dibuat: ${insertError.message}`,
      },
      { status: 500 },
    );
  }
  return NextResponse.json(
    {
      success: true,
      message: "Akun student berhasil dibuat.",
      data: {
        id: createdUser.user.id,
        name,
        gradeLevel,
        username,
        pin,
      },
    },
    { status: 201 },
  );
}
