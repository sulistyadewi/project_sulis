import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { gradeLevel: string } },
) {
  const gradeLevel = Number(params.gradeLevel);
  if (!Number.isFinite(gradeLevel)) {
    return NextResponse.json(
      {
        success: false,
        message: "gradeLevel invalid",
      },
      { status: 400 },
    );
  }
  const { data, error } = await supabase
    .from("materials")
    .select("*, classes!inner(grade_level)")
    .eq("classes.grade_level", gradeLevel)
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
