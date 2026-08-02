import Link from "next/link";
import type { ApiResponse, MaterialItem } from "@/types/learning";

async function getMaterials(gradeLevel: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/classes/${gradeLevel}/materials`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil data materi");
  }

  const result = (await response.json()) as ApiResponse<MaterialItem[]>;
  //   console.log(result, "ini dari materi");

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "Data materi tidak tersedia");
  }

  return result.data;
}

export default async function MaterialsByClassPage({
  params,
}: {
  params: Promise<{ gradeLevel: string }>;
}) {
  const { gradeLevel } = await params;
  const materials = await getMaterials(gradeLevel);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 to-[#0f0720] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-md bg-indigo-900 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm shadow-violet-800 hover:bg-indigo-500"
        >
          Kembali ke Daftar Kelas
        </Link>
        <div className="mb-8 rounded-lg bg-indigo-900 p-6 shadow-sm shadow-violet-800">
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-950">
            Kelas {gradeLevel}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-violet-50">
            Pilih Materi Belajar
          </h1>
          <p className="mt-3 text-slate-600">
            Pilih materi, tonton video pembelajaran, lalu kerjakan soal latihan
          </p>
        </div>

        {materials.length === 0 ? (
          <div className="rounded-lg bg-indigo-900 p-6 text-violet-300 shadow-sm shadow-violet-800">
            Materi untuk kelas ini belum tersedia
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <Link
                key={material.id}
                href={`/materi/${material.id}`}
                className="group overflow-hidden rounded-lg bg-indigo-900 shadow-sm shadow-violet-800 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-video bg-violet-800">
                  {material.image_url ? (
                    <img
                      src={material.image_url}
                      alt={material.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-lg font-bold text-violet-50">
                      Materi
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-bold text-violet-50">
                    {material.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-violet-400">
                    {material.description ?? "Video dan latihan soal tersedia."}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-violet-50">
                    Buka materi
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
