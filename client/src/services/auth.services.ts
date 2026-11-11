import { api } from "../api/api";
import type {
  SignupForm,
  LoginForm,
  ResetPasswordForm,
} from "../types/auth.types";
import type { ApiResponse } from "../types/ApiResponse";

export const signup = async (payload: SignupForm) => {
  const response = await api.post<ApiResponse>("/auth/signup", payload);
  return response.data;
};

export const login = async (payload: LoginForm) => {
  const response = await api.post<ApiResponse>("/auth/login", payload);
  return response.data;
};

export const verifyAccount = async (token: string) => {
  const response = await api.post<ApiResponse>(`/auth/verify-account/${token}`);
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await api.post<ApiResponse>(
    "/auth/resend-verification-email",
    { email },
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post<ApiResponse>("/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (
  token: string,
  payload: ResetPasswordForm,
) => {
  const response = await api.post<ApiResponse>(
    `/auth/reset-password/${token}`,
    payload,
  );
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const rotateTokens = async () => {
  const response = await api.post("/auth/rotate-tokens");
  return response.data;
};
