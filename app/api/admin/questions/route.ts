import { supabase } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    material_id,
    type,
    question,
    options,
    correct_answer,
    explanation,
    is_active,
    sort_order,
  } = body;

  if (!material_id || !type || !question) {
    return NextResponse.json(
      {
        success: false,
        message: "material Id, type, and question is required",
      },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.from("questions").insert({
    material_id,
    type,
    question,
    options: options ?? null,
    correct_answer: correct_answer || null,
    explanation: explanation || null,
    is_active: is_active ?? null,
    sort_order: sort_order ?? 0,
  });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal menambah soal",
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
