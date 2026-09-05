import Image from "next/image";
import { ClassItem, ApiResponse } from "@/types/learning";
import Link from "next/link";

const getClasses = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/classes`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("gagal mengambil kelas");
  }

  const result = (await response.json()) as ApiResponse<ClassItem[]>;

  console.log(result, "ini result home");

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "data kelas tidak tersedia");
  }
  return result.data;
};

export default async function Home() {
  const classes = await getClasses();
  return (
    <div className="bg-linear-to-br from-indigo-950  to-[#0f0720] min-h-screen px-4 py-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#6D6B9A]">
          My Project
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-200 md-text-5xl">
          Pilih Kelas Belajar
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[#D4C5F1]">
          Pilih kelas, tonton video materi, lalu kerjakan soal latihan
        </p>
      </div>

      {classes.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-slate-600 shadow-sm">
          Belum ada data kelas. Silahkan tambahkan data kelas terlebih dahulu
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
          {classes.map((item) => (
            <Link
              key={item.id}
              href={`/kelas/${item.grade_level}`}
              className="group overflow-hidden rounded-xl bg-[#F0EAFA] shadow-sm transition hover:translate-y-1 hover-shadow-md"
            >
              <div className="aspect-square bg-[#432A71]">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl font-bold text-[#9D7BE0]">
                    {item.grade_level}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {item.description ?? "Materi Belajar"}
                </p>
                <p className="mt-4 text-sm font-semibold text-violet-700">
                  Lihat materi
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
