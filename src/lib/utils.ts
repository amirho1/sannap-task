import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fa from "@/locales/fa.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translate(key: keyof typeof fa) {
  return fa[key] || key;
}
