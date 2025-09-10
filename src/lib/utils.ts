import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fa from "@/locales/fa.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translate(key: keyof typeof fa) {
  return fa[key] || key;
}
const signupBase = "/api/v2/app/DEY/agent/verification/signup";

export const apiRoutes = {
  createOTP: `${signupBase}/create_otp/`,
  validateOTP: `${signupBase}/validate_otp/`,
  states: `/base/provinces_wop/`,
  cities: `/base/counties_wop/`,
  insuranceBranch: "/api/v2/app/selection_item/insurance_branch/wop_list/",
  checkAgencyCode: "/api/v2/app/DEY/agent/verification/signup/check_agency_code/",
  signup: `${signupBase}/`,
  status: "/api/v2/app/DEY/agent/app_user_status/",
};

export function debounce(func: (...args: any[]) => any, delay: number = 1000) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), delay);
  };
}
