export const lightColors = {
  primary: "#0f172a",
  secondary: "#3b82f6",
  background: "#eff4ff",
  surface: "#f8f9ff",
  text: "#0f172a",
  border: "#cbd5e1",
  success: "#10b981",
  error: "#ef4444",
} as const;

export const darkColors = {
  primary: "#38bdf8",
  secondary: "#94a3b8",
  background: "#1e293b",
  surface: "#0f172a",
  text: "#f8fafc",
  border: "#334155",
  success: "#10b981",
  error: "#f87171",
} as const;

export type AppColors = typeof lightColors;
