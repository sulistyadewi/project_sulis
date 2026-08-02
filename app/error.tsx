"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-950 to-[#0f0720] px-4">
      <div className="max-w-md rounded-lg bg-[#0b0031] p-6 text-center shadow-sm shadow-indigo-800">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Terjadi Kendala
        </p>
        <h1 className="mt-2 text-2xl font-bold text-indigo-50">
          Data belum bisa ditampilkan
        </h1>
        <p>{error.message || "Silahkan coba lagi beberapa saat."}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-md bg-violet-800 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-900"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
