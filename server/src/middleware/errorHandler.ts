import { CustomError, InternalServerError } from "../errors/errors.js";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof CustomError && error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  console.error("Error : ", error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    statusCode: 500,
  });
};
