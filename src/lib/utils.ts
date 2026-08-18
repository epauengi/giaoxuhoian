import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "Thứ Ba, 18.08.2026" — Vietnamese date, no locale deps */
export function formatVi(date: Date): string {
  const days = ["Chúa nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${days[date.getDay()]}, ${d}.${m}.${date.getFullYear()}`;
}
