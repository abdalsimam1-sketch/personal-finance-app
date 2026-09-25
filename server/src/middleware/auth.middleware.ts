import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/errors.js";

export const auth = (req: any, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new UnauthorizedError("Invalid or expired tokens");
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_SECRET as string);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired tokens");
  }
};
