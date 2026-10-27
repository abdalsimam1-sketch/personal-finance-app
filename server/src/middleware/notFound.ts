import { NotFound } from "../errors/errors.js";
import type { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  throw new NotFound();
};
