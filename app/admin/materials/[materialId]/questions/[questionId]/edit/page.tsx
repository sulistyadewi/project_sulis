import QuestionForm from "@/app/components/admin/questionForm";
import Link from "next/link";
import { ApiResponse, QuestionMaterial } from "@/types/learning";

const getQuestion = async (questionId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/admin/questions/${questionId}/detail`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("gagal mengambil soal");
  }

  const result = (await response.json()) as ApiResponse<QuestionMaterial[]>;

  console.log(result, "ini result question edit");

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "data soal tidak tersedia");
  }
  return result.data;
};

export default async function EditQuestion({
  params,
}: {
  params: Promise<{ materialId: string; questionId: string }>;
}) {
  const { materialId, questionId } = await params;
  const question = await getQuestion(questionId);

  return (
    <div>
      <div>
        <QuestionForm materialId={Number(materialId)} />
      </div>
    </div>
  );
}
