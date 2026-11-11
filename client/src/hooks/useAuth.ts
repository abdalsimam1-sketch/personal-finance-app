import * as authServices from "../services/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { LoginForm, SignupForm } from "../types/auth.types";
import type { ApiResponse } from "../types/ApiResponse";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ResetPasswordForm } from "../types/auth.types";

export const useAuth = () => {
  const signupMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    SignupForm
  >({
    mutationFn: authServices.signup,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });

  const loginMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    LoginForm
  >({
    mutationFn: authServices.login,
    onSuccess: () => {},
    onError: () => {},
  });

  const verifyAccountMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    string
  >({
    mutationFn: authServices.verifyAccount,
    onSuccess: () => {
      toast.success("Account Verified");
    },
    onError: () => {
      toast.error("Account verification failed");
    },
  });

  const resendVerificationEmailMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    string
  >({
    mutationFn: authServices.resendVerificationEmail,
    onSuccess: () => {
      toast.success("If email exists a verification email will be sent");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const forgotPasswordMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    string
  >({
    mutationFn: authServices.forgotPassword,
    onSuccess: () => {
      toast.success("If email exists a reset email will be sent");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const resetPasswordMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    { token: string; payload: ResetPasswordForm }
  >({
    mutationFn: ({ token, payload }) =>
      authServices.resetPassword(token, payload),
    onSuccess: () => {
      toast.success("Password reset successful");
    },
    onError: () => {
      toast.error("Password reset failed");
    },
  });

  const getMeQuery = useQuery<ApiResponse, AxiosError<ApiResponse>>({
    queryKey: ["me"],
    queryFn: authServices.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    signupMutation,
    loginMutation,
    verifyAccountMutation,
    resendVerificationEmailMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    getMeQuery,
  };
};
