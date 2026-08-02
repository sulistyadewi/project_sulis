import type { QuestionMaterial } from "@/types/learning";
import { error } from "console";

export function validateQuestion(question: QuestionMaterial) {
  const errors: string[] = [];

  if (!question.question || question.question.trim().length === 0) {
    errors.push("Pertanyaan Kosong");
  }

  if (!question.type) {
    errors.push("Tipe soal kosong");
  }

  if (question.type === "pilihan ganda") {
    if (!Array.isArray(question.options) || question.options.length < 2) {
      errors.push("Pilihan ganda minimal memiliki 2 opsi");
    }
    if (!question.correct_answer) {
      errors.push("Jawaban benar kosong");
    }
    if (
      Array.isArray(question.options) &&
      question.correct_answer &&
      !question.options.includes(question.correct_answer)
    ) {
      errors.push("Jawaban benar tidak ada di dalam opsi");
    }
  }

  if (question.type === "essay") {
    if (question.correct_answer) {
      errors.push("Jawaban essay kosong");
    }
  }

  if (!question.explanation || question.explanation.trim().length === 0) {
    errors.push("Pembahasan kosong");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
