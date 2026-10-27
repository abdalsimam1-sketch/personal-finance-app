import { CustomError } from "../errors/errors.js";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);
  if (error instanceof CustomError) {
    return res.status(error.status).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    data: {},
  });
};
