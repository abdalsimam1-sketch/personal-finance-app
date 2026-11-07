import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../errors/errors.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new Unauthorized("Invalid or expired tokens");
  }
  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET!);
    req.user = payload;
  } catch (error) {
    throw new Unauthorized("Invalid or expired tokens");
  }
  next();
};
