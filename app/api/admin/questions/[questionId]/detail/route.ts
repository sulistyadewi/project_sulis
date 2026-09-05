import { supabase } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ questionId: string }> },
) {
  const { questionId } = await context.params;
  const id = Number(questionId);

  if (!Number.isFinite(id)) {
    return NextResponse.json(
      {
        success: false,
        message: "id tidak ditemukan",
      },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.from("questions").select("*");
  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "tidak dapat terhubung ke supabase",
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
