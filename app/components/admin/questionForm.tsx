"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type OptionItem = {
  label: string;
  value: string;
  valueEdited: boolean;
};

type QuestionFormProps = {
  materialId: number;
  initialQuestion?: {
    id: number;
    type: string;
    question: string;
    image_url: string | null;
    options: string[] | null;
    correct_answer: string | null;
    explanation: string | null;
    difficulty: string;
    sort_order: number;
    is_active: boolean;
  };
};

function toInitialOptions(options?: string[] | null) {
  if (!options || options.length === 0) {
    return [
      { label: "", value: "", valueEdited: false },
      { label: "", value: "", valueEdited: false },
      { label: "", value: "", valueEdited: false },
      { label: "", value: "", valueEdited: false },
    ];
  }

  return options.map((option) => ({
    label: option,
    value: option,
    valueEdited: false,
  }));
}

export default function QuestionForm({
  materialId,
  initialQuestion,
}: QuestionFormProps) {
  const router = useRouter();

  const [type, setType] = useState(initialQuestion?.type ?? "pilihan_ganda");
  const [question, setQuestion] = useState(initialQuestion?.question ?? "");
  const [imageUrl, setImageUrl] = useState(initialQuestion?.image_url ?? "");
  const [options, setOptions] = useState<OptionItem[]>(
    toInitialOptions(initialQuestion?.options),
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    initialQuestion?.correct_answer ?? "",
  );
  const [explanation, setExplanation] = useState(
    initialQuestion?.explanation ?? "",
  );
  const [difficulty, setDifficulty] = useState(
    initialQuestion?.difficulty ?? "medium",
  );
  const [sortOrder, setSortOrder] = useState(initialQuestion?.sort_order ?? 0);
  const [isActive, setIsActive] = useState(initialQuestion?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const cleanOptions = useMemo(() => {
    return options
      .map((option) => option.value.trim())
      .filter((value) => value.length > 0);
  }, [options]);

  function updateOptionLabel(index: number, label: string) {
    setOptions((current) =>
      current.map((option, optionIndex) => {
        if (optionIndex !== index) return option;

        return {
          ...option,
          label,
          value: option.valueEdited ? option.value : label,
        };
      }),
    );
  }

  function updateOptionValue(index: number, value: string) {
    setOptions((current) =>
      current.map((option, optionIndex) => {
        if (optionIndex !== index) return option;

        return {
          ...option,
          value,
          valueEdited: true,
        };
      }),
    );
  }

  function addOption() {
    setOptions((current) => [
      ...current,
      { label: "", value: "", valueEdited: false },
    ]);
  }

  function removeOption(index: number) {
    setOptions((current) =>
      current.filter((_, optionIndex) => optionIndex !== index),
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      material_id: materialId,
      type,
      question,
      image_url: imageUrl,
      options: type === "pilihan_ganda" ? cleanOptions : null,
      correct_answer: correctAnswer,
      explanation,
      difficulty,
      sort_order: sortOrder,
      is_active: isActive,
    };

    const url = initialQuestion
      ? `/api/admin/questions/${initialQuestion.id}`
      : "/api/admin/questions";

    const method = initialQuestion ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      setSaving(false);
      setError(result.message ?? "Gagal menyimpan soal");
      return;
    }

    router.push(`/admin/materials/${materialId}/questions`);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg bg-white p-5 shadow-sm "
    >
      {error ? (
        <div className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Tipe Soal
          </span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          >
            <option value="pilihan_ganda">Pilihan Ganda</option>
            <option value="essay">Essay</option>
            <option value="multipart">Multipart</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Difficulty
          </span>
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Urutan</span>
          <input
            type="number"
            value={sortOrder}
            onChange={(event) => setSortOrder(Number(event.target.value))}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Pertanyaan</span>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={5}
          className="w-full rounded-md border border-slate-200 px-3 py-2"
          placeholder="Tulis pertanyaan soal"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Image URL</span>
        <input
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2"
          placeholder="/images/questions/class-1/material-1/question-1.png"
        />
      </label>

      {type === "pilihan_ganda" ? (
        <div className="space-y-3 rounded-md border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900">Opsi Jawaban</h2>
              <p className="text-sm text-slate-600">
                Saat label diketik, value otomatis mengikuti label.
              </p>
            </div>

            <button
              type="button"
              onClick={addOption}
              className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
            >
              Tambah Opsi
            </button>
          </div>

          {options.map((option, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-md bg-slate-50 p-3 md:grid-cols-[1fr_1fr_auto]"
            >
              <label className="space-y-1">
                <span className="text-xs font-semibold text-slate-600">
                  Label
                </span>
                <input
                  value={option.label}
                  onChange={(event) =>
                    updateOptionLabel(index, event.target.value)
                  }
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                  placeholder="Contoh: 12 apel"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold text-slate-600">
                  Value
                </span>
                <input
                  value={option.value}
                  onChange={(event) =>
                    updateOptionValue(index, event.target.value)
                  }
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                  placeholder="Otomatis mengikuti label"
                />
              </label>

              <button
                type="button"
                onClick={() => removeOption(index)}
                className="self-end rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">
          Jawaban Benar
        </span>
        {type === "pilihan_ganda" ? (
          <select
            value={correctAnswer}
            onChange={(event) => setCorrectAnswer(event.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          >
            <option value="">Pilih jawaban benar</option>
            {cleanOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={correctAnswer}
            onChange={(event) => setCorrectAnswer(event.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
            placeholder="Tulis jawaban benar"
          />
        )}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Pembahasan</span>
        <textarea
          value={explanation}
          onChange={(event) => setExplanation(event.target.value)}
          rows={5}
          className="w-full rounded-md border border-slate-200 px-3 py-2"
          placeholder="Tulis pembahasan jawaban"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(event) => setIsActive(event.target.checked)}
        />
        <span className="text-sm font-semibold text-slate-700">Soal aktif</span>
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:bg-slate-300"
      >
        {saving ? "Menyimpan..." : "Simpan Soal"}
      </button>
    </form>
  );
}
