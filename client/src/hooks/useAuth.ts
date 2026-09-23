import { useMutation } from "@tanstack/react-query";
import * as authServices from "../services/auth.service";
import type * as authTypes from "../types/auth.types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

type AuthErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
};

export const useAuth = () => {
  const loginMutation = useMutation<
    unknown,
    AxiosError<AuthErrorResponse>,
    authTypes.LoginFormType
  >({
    mutationFn: (payload: authTypes.LoginFormType) =>
      authServices.login(payload),
    onSuccess: () => {
      toast.success("Login Successful");
    },
    onError: () => {
      toast.error("Login Failed");
    },
  });

  const signupMutation = useMutation<
    unknown,
    AxiosError<AuthErrorResponse>,
    authTypes.SignupFormType
  >({
    mutationFn: (payload: authTypes.SignupFormType) =>
      authServices.signup(payload),
    onSuccess: () => {
      toast.success("Signup Successful");
    },
    onError: () => {
      toast.error("Signup Failed");
    },
  });
  type VerifyEmailResponse = {
    message: string;
  };

  const verifyEmailMutation = useMutation<
    VerifyEmailResponse,
    AxiosError<AuthErrorResponse>,
    string
  >({
    mutationFn: (token: string) => authServices.verifyEmail(token),
    onSuccess: () => {
      toast.success("Email verified");
    },
  });

  const resendVerificationEmailMutation = useMutation<
    unknown,
    AxiosError<AuthErrorResponse>,
    string
  >({
    mutationFn: (email: string) => authServices.resendVerificationEmail(email),
    onSuccess: () => {
      toast.success("If email exists, a verification email will be sent");
    },
  });
  return {
    loginMutation,
    signupMutation,
    verifyEmailMutation,
    resendVerificationEmailMutation,
  };
};
