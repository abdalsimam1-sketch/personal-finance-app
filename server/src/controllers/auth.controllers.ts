import type { Request, Response } from "express";
import * as authServices from "../services/auth.services.js";
import { generateJWT } from "../utils/generateJWT.js";
import { hashToken } from "../utils/hashCryptoToken.js";

//validations
import { signupSchema, loginSchema } from "../validations/auth.validations.js";
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

  res.redirect(process.env.CLIENT_URL! as string);
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
