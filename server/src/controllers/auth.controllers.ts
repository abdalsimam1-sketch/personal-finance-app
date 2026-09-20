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
