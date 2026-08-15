import { supabase } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ questionId: string }> },
) {
  const { questionId } = await context.params;
  const id = Number(questionId);

  if (!Number.isFinite(id)) {
    return NextResponse.json(
      {
        success: false,
        message: "material Id invalid",
      },
      { status: 400 },
    );
  }

  const body = await request.json();
  const { data, error } = await supabase
    .from("questions")
    .update({
      material_id: body.material_id,
      type: body.type,
      question: body.question,
      options: body.options ?? null,
      correct_answer: body.correct_answer || null,
      explanation: body.explanation || null,
      is_active: body.is_active ?? null,
      sort_order: body.sort_order ?? null,
      update_at: new Date().toISOString,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal mengedit soal",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}
