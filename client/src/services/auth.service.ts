import { api } from "../api/api";

export const login = async (payload: { email: string; password: string }) => {
  const response = await api.post("auth/login", payload);
  return response.data;
};

export const signup = async (payload: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await api.post(`/auth/verify-email/${token}`);
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await api.post(`/auth/resend-verification-email`, { email });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post(`/auth/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (
  token: string,
  payload: { newPassword: string; confirmNewPassword: string },
) => {
  const response = await api.post(`/auth/reset-password/${token}`, payload);
  return response.data;
};
