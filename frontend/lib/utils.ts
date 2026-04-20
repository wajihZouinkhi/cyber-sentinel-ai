import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function severityColor(s: number) {
  if (s >= 9) return "text-cyber-red";
  if (s >= 7) return "text-cyber-amber";
  if (s >= 4) return "text-cyber-cyan";
  return "text-cyber-green";
}
export function severityLabel(s: number) {
  if (s >= 9) return "CRITICAL";
  if (s >= 7) return "HIGH";
  if (s >= 4) return "MEDIUM";
  return "LOW";
}
