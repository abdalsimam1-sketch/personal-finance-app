import type { Request, Response } from "express";
import * as authServices from "../services/auth.services.js";
import { signupSchema, loginSchema } from "../validation/auth.validations.js";
import { BadRequestError } from "../errors/errors.js";
import { cookieOptions } from "../utils/cookieOptions.js";

export const signup = async (req: Request, res: Response) => {
  const { data, error, success } = signupSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequestError(error.issues[0]?.message);
  }
  const { confirmPassword, ...signupForm } = data;
  const user = await authServices.signupService(signupForm);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { data, success, error } = loginSchema.safeParse(req.body);

  if (!success) {
    throw new BadRequestError(error.issues[0]?.message);
  }

  const { accessToken, refreshToken, user } =
    await authServices.loginService(data);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User logged in",
    data: {
      user,
    },
  });
};

export const logout = async (req: any, res: Response) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken || !refreshToken) {
    throw new BadRequestError("Invalid or expired token");
  }
  await authServices.logoutService(req.user.id);
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged out",
    data: {},
  });
};

export const getMe = async (req: any, res: Response) => {
  const id = req.user.id;

  const user = await authServices.getMeService(id);

  res.status(200).json({
    success: true,
    message: "User found",
    data: {
      user,
    },
  });
};

export const rotateTokens = async (req: any, res: Response) => {
  const { newAccessToken, newRefreshToken, user } =
    await authServices.rotateTokensService(req.user);

  res.cookie("accessToken", newAccessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", newRefreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "Tokens rotated",
    data: {
      user,
    },
  });
};
