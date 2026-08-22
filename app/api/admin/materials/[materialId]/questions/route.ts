import { supabase } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ materialId: string }> },
) {
  const { materialId } = await context.params;
  const id = Number(materialId);

  if (!Number.isFinite(id)) {
    return NextResponse.json(
      {
        success: false,
        message: "material id invalid",
      },
      {
        status: 400,
      },
    );
  }

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("material_id", id)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal mengambil soal",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
  return NextResponse.json({
    succes: true,
    data,
  });
}
