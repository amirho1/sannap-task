import { config } from "@/lib/config";
import { translate } from "@/lib/utils";
import type { ResponseT } from "@/types";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
});

axiosInstance.interceptors.request.use(request => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) request.headers.Authorization = `jwt ${accessToken}`;

  return request;
});

axiosInstance.interceptors.response.use(
  response => {
    switch (response.status) {
      case 400: {
        const msg = response.data?.error_details?.fa_details ?? translate("processingError");
        if (response.data?.error_details?.code === "agent_code_unique") toast.warning(msg);
        else toast.warning(msg);
        break;
      }
      case 401: {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return response;
  },
  (error: AxiosError<ResponseT>) => {
    const msg =
      error.response?.data?.error_details?.fa_details ?? error.message ?? translate("networkError");

    toast.error(msg);

    const synthetic: AxiosResponse = {
      data: error.response?.data || null,
      status: 0,
      statusText: "NETWORK_ERROR",
      headers: {},
      config: error.config!,
      request: error.request,
    };
    return Promise.resolve(synthetic);
  }
);
