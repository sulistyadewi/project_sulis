import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ materialId: string }> },
) {
  const { materialId } = await context.params;

  const material = Number(materialId);

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
    .from("materials")
    .select("*")
    .eq("id", material)
    .eq("is_active", true)
    .single();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal mengambil detail materi",
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
