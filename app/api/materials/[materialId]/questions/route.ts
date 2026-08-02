import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ materialId: string }> },
) {
  const { materialId } = await context.params;
  console.log(materialId, "ini material id");

  const material = Number(materialId);
  console.log(material, "ini material saja");

  if (!Number.isFinite(material)) {
    return NextResponse.json(
      {
        success: false,
        message: "material Id invalid",
      },
      { status: 400 },
    );
  }
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("material_id", material)
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
