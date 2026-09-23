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
  return { loginMutation, signupMutation };
};
