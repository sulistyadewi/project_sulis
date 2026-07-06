import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("classes").select("*");
  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "gagal terhubung ke supabase",
        error: error.message,
      },
      { status: 500 },
    );
  }
  return NextResponse.json({
    succes: true,
    message: "berhasil terhubung ke supabase",
    data,
  });
}
