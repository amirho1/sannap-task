import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fa from "@/locales/fa.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translate(key: keyof typeof fa) {
  return fa[key] || key;
}

export const apiRoutes = {
  createOTP: "/agent/verification/signup/create_otp/",
  validateOTP: "/agent/verification/signup/validate_otp/",
};

export function debounce(func: (...args: any[]) => any, delay: number = 1000) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), delay);
  };
}
