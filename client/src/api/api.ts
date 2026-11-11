import axios from "axios";
import type { AxiosError } from "axios";
import { rotateTokens } from "../services/auth.services";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }
    if (
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/rotate-tokens") ||
      originalRequest?.url?.includes("/verify-account")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    try {
      if (refreshPromise === null) {
        refreshPromise = rotateTokens();
      }
      await refreshPromise;
      refreshPromise = null;
      return await axios.request(originalRequest);
    } catch (rotateError) {
      refreshPromise = null;
      return Promise.reject(rotateError);
    }
  },
);
