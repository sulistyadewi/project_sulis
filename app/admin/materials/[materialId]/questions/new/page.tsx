import QuestionForm from "@/app/components/admin/questionForm";
import Link from "next/link";

export default async function NewQuestionPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  const id = Number(materialId);

  return (
    <div>
      <div>
        <Link href={`/admin/materials/${materialId}/questions`}>
          <button className="bg-red-500 text-black px-2 py-2">Back</button>
        </Link>
      </div>
      <div>
        <QuestionForm materialId={id} />
      </div>
    </div>
  );
}
