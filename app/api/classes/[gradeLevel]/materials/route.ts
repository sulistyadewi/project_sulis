import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ gradeLevel: string }> },
) {
  const { gradeLevel } = await context.params;
  console.log(gradeLevel, "ini grade level");

  const grade = Number(gradeLevel);
  console.log(grade, "ini grade saja");

  if (!Number.isFinite(grade)) {
    return NextResponse.json(
      {
        success: false,
        message: "grade level invalid",
      },
      { status: 400 },
    );
  }
  const { data, error } = await supabase
    .from("materials")
    .select("*, classes!inner(grade_level)")
    .eq("classes.grade_level", grade)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal mengambil materi",
        error: error.message,
      },
      { status: 500 },
    );
  }
  return NextResponse.json({
    success: true,
    data,
  });
}
