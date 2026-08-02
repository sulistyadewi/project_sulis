import Link from "next/link";
import type { ApiResponse, MaterialItem } from "@/types/learning";

function getYoutubeEmbedUrl(url: string | null) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsedUrl.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
    }

    if (parsedUrl.pathname.includes("/embed/")) {
      return url;
    }

    return null;
  } catch {
    return null;
  }
}

async function getMaterial(materialId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/materials/${materialId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil detail materi");
  }

  const result = (await response.json()) as ApiResponse<MaterialItem>;
  console.log(result, "ini detail materi");

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "Detail materi tidak tersedia");
  }

  return result.data;
}

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  const material = await getMaterial(materialId);
  //   const embedUrl = getYoutubeEmbedUrl(material.youtube_url);

  return (
    <div className="min-h-screen bg-[#eefbf3] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50"
        >
          Kembali ke Daftar Kelas
        </Link>

        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {/* <div className="aspect-video bg-slate-900">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={material.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-white">
                Video pembelajaran akan tersedia secepatnya. Kamu tetap bisa
                mulai latihan soal sekarang.
              </div>
            )}
          </div> */}

          <div className="p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Video Pembelajaran
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {material.title}
            </h1>
            <p className="mt-3 text-slate-600">
              {material.description ??
                "Pelajari materi ini melalui video, lalu lanjutkan dengan latihan soal."}
            </p>

            <div className="mt-6">
              <Link
                href={`/latihan/${material.id}`}
                className="inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                Mulai Latihan Soal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
