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
    <div className="bg-linear-to-br from-indigo-950  to-[#070316] h-screen">
      <div className="max-w-5xl mx-auto mt-6">
        <h1>Kelola soal #{materialId}</h1>
        <div>
          <Link
            href={`admin/materials/${materialId}/questions/new`}
            className="bg-white text-indigo-800 px-2 py-2 rounded-full"
          >
            Tambah soal
          </Link>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="mt-5">
            <table className="rounded-base">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default rounded-lg">
                <tr className="bg-indigo-900 rounded-lg">
                  <th className="py-2 px-6">Nomor</th>
                  <th className="py-2 px-6">Pertanyaan</th>
                  <th className="py-2 px-4">Tipe</th>
                  <th className="py-2 px-6">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="even:bg-violet-900 odd:bg-violet-950">
                  <td className="py-2 px-6 text-center">{question.id}</td>
                  <td className="py-2 px-6">{question.question}</td>
                  <td className="py-2 px-4 font-semibold text-violet-200 text-center">
                    {question.type}
                  </td>
                  <td className="flex gap-3 py-2 px-6">
                    <Link
                      href={`/admin/materials/${materialId}/questions/${question.id}/edit`}
                      className="bg-blue-500 p-1 rounded-lg hover:bg-blue-600 hover:scale-110 delay-100 transition-all"
                    >
                      Edit
                    </Link>
                    <span className="bg-red-500 p-1 rounded-lg hover:bg-red-600 hover:scale-110 delay-100 transition-all">
                      Delete
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
