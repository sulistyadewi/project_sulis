import { QuestionMaterial, ApiResponse } from "@/types/learning";
import Link from "next/link";

const getAdminQuestion = async (materialId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/admin/materials/${materialId}/questions`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("gagal mengambil soal");
  }

  const result = (await response.json()) as ApiResponse<QuestionMaterial[]>;

  console.log(result, "ini result question");

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "data soal tidak tersedia");
  }
  return result.data;
};

export default async function AdminQuestionPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  const questions = await getAdminQuestion(materialId);

  return (
    <div>
      <div>
        <h1>Kelola soal #{materialId}</h1>
        {questions.map((question, index) => (
          <div key={index}>
            <h1>{question.type}</h1>
            <h1>{question.question}</h1>
            <h1>{question.options}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
