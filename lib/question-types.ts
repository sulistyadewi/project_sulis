export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "pilihan_ganda",
  ESSAY: "essay",
} as const;

export type QuestionsType =
  (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export function getQuestionTypeLabel(type: string) {
  if (type === QUESTION_TYPES.MULTIPLE_CHOICE) return "Pilihan Ganda";
  if (type === QUESTION_TYPES.ESSAY) return "Essay";
}
