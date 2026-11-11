import type { Request, Response } from "express";
import * as authServices from "../services/auth.services.js";
import { generateJWT } from "../utils/generateJWT.js";
import { hashToken } from "../utils/hashCryptoToken.js";

//validations
import {
  signupSchema,
  loginSchema,
  resendSchema,
  resetPasswordSchema,
} from "../validations/auth.validations.js";
import { BadRequest, Unauthorized } from "../errors/errors.js";

import { cookieOptions } from "../utils/cookieOptions.js";
import { prisma } from "../lib/prisma.js";

export const signup = async (req: Request, res: Response) => {
  const { success, data, error } = signupSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }
  const user = await authServices.signupService(data);

  res.status(201).json({
    success: true,
    message: "Signup successful",
    data: {
      user,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { success, error, data } = loginSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }
  const { user, accessToken, refreshToken } =
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
    message: "Login successful",
    data: { user },
  });
};

export const googleCallback = async (req: any, res: Response) => {
  const user = req.user;

  const { accessToken, refreshToken } = generateJWT({
    id: user.id,
    email: user.email,
  });

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      refreshTokenHash: hashToken(refreshToken),
      refreshTokenHashExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.CLIENT_URL}/overview`);
};

export const rotateTokens = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Unauthorized("Invalid or expired tokens");
  }

  const { user, newAccessToken, newRefreshToken } =
    await authServices.rotateTokensService(refreshToken);

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
    data: { user },
  });
};

export const verifyAccount = async (req: Request, res: Response) => {
  const token = req.params.token as string;

  await authServices.verifyAccountService(token);

  res.status(200).json({
    success: true,
    message: "Account verified",
    data: {},
  });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  await authServices.logoutService(refreshToken);
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).json({
    success: true,
    message: "Logged out",
    data: {},
  });
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { error, data, success } = resendSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }
  await authServices.resendVerificationEmailService(data.email);

  res.status(200).json({
    success: true,
    message: "If email exists a new verification email will be sent",
    data: {},
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { data, success, error } = resendSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }
  await authServices.forgotPasswordService(data.email);
  res.status(200).json({
    success: true,
    message: "If email exists a reset email will be sent",
    data: {},
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const token = req.params.token as string;
  const { data, error } = resetPasswordSchema.safeParse(req.body);
  if (error) {
    throw new BadRequest(error.issues[0]?.message);
  }
  await authServices.resetPasswordService({
    newPassword: data.newPassword,
    token,
  });

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({
    success: true,
    message: "Password reset",
    data: {},
  });
};

export const getMe = async (req: Request, res: Response) => {
  const id = (req.user as any).id;
  const user = await authServices.getMeService(id);

  res.status(200).json({
    success: true,
    message: "User found",
    data: {
      user,
    },
  });
};
