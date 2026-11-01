import type { Request, Response } from "express";
import * as authServices from "../services/auth.services.js";

//validations
import { signupSchema } from "../validations/auth.validations.js";
import { BadRequest } from "../errors/errors.js";

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
