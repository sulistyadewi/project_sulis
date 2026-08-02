export type ClassItem = {
  id: number;
  grade_level: number;
  title: string;
  description: string | null;
  image_url: string | null;
};

export type MaterialItem = {
  id: number;
  class_id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  is_active: boolean;
  sort_order: number;
};

export type QuestionMaterial = {
  id: number;
  material_id: number;
  type: "pilihan ganda" | "essay";
  question: string;
  options: string[] | null;
  correct_answer: string;
  explanation: string;
  is_active: boolean;
  sort_order: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  error: string;
  data?: T;
};
