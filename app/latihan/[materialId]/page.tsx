import QuizClient from "./quiz-client";
import type { ApiResponse, QuestionMaterial } from "@/types/learning";

async function getQuestions(materialId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/materials/${materialId}/questions`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil soal latihan");
  }

  const result = (await response.json()) as ApiResponse<QuestionMaterial[]>;

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "Soal latihan tidak tersedia");
  }

  return result.data;
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  const questions = await getQuestions(materialId);

  return <QuizClient materialId={materialId} questions={questions} />;
}
