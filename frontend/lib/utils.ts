import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Severity } from "@/lib/api";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

type SevInput = Severity | number;
function toBucket(s: SevInput): Severity {
  if (typeof s === "number") {
    if (s >= 9) return "critical";
    if (s >= 7) return "high";
    if (s >= 4) return "medium";
    return "low";
  }
  return s;
}
export function severityColor(s: SevInput) {
  const b = toBucket(s);
  if (b === "critical") return "text-cyber-red";
  if (b === "high")     return "text-cyber-amber";
  if (b === "medium")   return "text-cyber-cyan";
  return "text-cyber-green";
}
export function severityLabel(s: SevInput) {
  return toBucket(s).toUpperCase();
}
