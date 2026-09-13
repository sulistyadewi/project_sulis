import type { User } from "@supabase/supabase-js";

export type UserRole = "admin" | "student";

export function normalizeRole(role: unknown): UserRole | null {
  if (typeof role !== "string") return null;
  let lowerRole = role.trim().toLowerCase();
  if (lowerRole === "admin") return "admin";
  if (lowerRole === "student") return "student";
  return null;
}

export function getUserRole(user: User | null): UserRole {
  return (
    normalizeRole(user?.app_metadata.role) ??
    normalizeRole(user?.user_metadata.role) ??
    "student"
  );
}

export function getDashboard(role: UserRole) {
  return role === "admin" ? "/dashboard/admin" : "/dashboard/student";
}
