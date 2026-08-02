"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { QuestionMaterial } from "@/types/learning";
import { validateQuestion } from "@/lib/validate-question";

type QuizClientProps = {
  materialId: string;
  questions: QuestionMaterial[];
};

export default function QuizClient({ materialId, questions }: QuizClientProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered =
    questions.length > 0 && answeredCount === questions.length;

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      const userAnswer = answers[question.id];
      return userAnswer === question.correct_answer ? total + 1 : total;
    }, 0);
  }, [answers, questions]);

  function handleSelect(questionId: number, value: string) {
    if (submitted) return;

    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  const validQuestions = questions.filter((question) => {
    return validateQuestion(question).valid;
  });

  return (
    <main className="min-h-screen bg-[#eefbf3] px-4 py-8">
      <section className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/materi/${materialId}`}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50"
          >
            Kembali ke Materi
          </Link>

          <div className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            Terjawab {answeredCount} dari {questions.length}
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Latihan Soal
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Kerjakan Semua Soal
          </h1>
          <p className="mt-3 text-slate-600">
            Pilih jawaban terbaik. Setelah semua soal dijawab, tombol submit
            akan aktif.
          </p>
        </div>

        {questions.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">
            Soal latihan untuk materi ini belum tersedia.
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect =
                submitted && userAnswer === question.correct_answer;
              const isWrong =
                submitted && userAnswer !== question.correct_answer;

              return (
                <article
                  key={question.id}
                  className={[
                    "rounded-lg border bg-white p-5 shadow-sm",
                    isCorrect ? "border-emerald-300 bg-emerald-50" : "",
                    isWrong ? "border-red-300 bg-red-50" : "",
                  ].join(" ")}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {question.question}
                      </p>
                      {/* {question.image_url ? (
                        <img
                          src={question.image_url}
                          alt={`Gambar soal nomor ${index + 1}`}
                          className="mt-3 max-h-72 rounded-md border object-contain"
                        />
                      ) : null} */}
                    </div>
                  </div>

                  {question.type === "pilihan ganda" && question.options ? (
                    <div className="space-y-2">
                      {question.options.map((option) => {
                        const selected = userAnswer === option;
                        const correctOption =
                          submitted && option === question.correct_answer;
                        const wrongOption =
                          submitted &&
                          selected &&
                          option !== question.correct_answer;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleSelect(question.id, option)}
                            className={[
                              "w-full rounded-md border px-4 py-3 text-left text-sm transition",
                              selected
                                ? "border-emerald-600 bg-emerald-50"
                                : "border-slate-200 bg-white hover:bg-slate-50",
                              correctOption
                                ? "border-emerald-700 bg-emerald-200 text-emerald-950"
                                : "",
                              wrongOption
                                ? "border-red-700 bg-red-200 text-red-950"
                                : "",
                            ].join(" ")}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      type="text"
                      disabled={submitted}
                      value={userAnswer ?? ""}
                      onChange={(event) =>
                        handleSelect(question.id, event.target.value)
                      }
                      placeholder="Tulis jawaban"
                      className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
                    />
                  )}

                  {submitted ? (
                    <div className="mt-4 rounded-md bg-white p-4 text-sm text-slate-700">
                      <p
                        className={
                          isCorrect
                            ? "font-bold text-emerald-700"
                            : "font-bold text-red-700"
                        }
                      >
                        {isCorrect
                          ? "Jawaban sudah benar."
                          : "Jawaban belum tepat."}
                      </p>
                      {question.explanation ? (
                        <p className="mt-2 whitespace-pre-line">
                          {question.explanation}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })}

            <div className="sticky bottom-4 rounded-lg bg-white p-4 shadow-lg">
              {submitted ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-slate-900">
                    Skor kamu: {score} dari {questions.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setSubmitted(false);
                    }}
                    className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    Ulangi Latihan
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={!allAnswered}
                  onClick={handleSubmit}
                  className="w-full rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Submit Jawaban
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
