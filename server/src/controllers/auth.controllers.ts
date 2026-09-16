import type { Request, Response } from "express";
import * as authServices from "../services/auth.services.js";
import { signupSchema } from "../validation/auth.validations.js";
import { BadRequestError } from "../errors/errors.js";

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
