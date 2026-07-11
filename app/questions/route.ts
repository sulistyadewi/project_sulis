import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { classId: string } },
) {
  const classId = Number(params.classId);
  if (!Number.isFinite(classId)) {
    return NextResponse.json(
      {
        success: false,
        message: "classId invalid",
      },
      { status: 400 },
    );
  }
  const { data, error } = await supabase
    .from("questions")
    .select("*, materials!inner(class_id)")
    .eq("materials.class_id", classId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal mengambil soal",
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
