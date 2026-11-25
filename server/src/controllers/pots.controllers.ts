import type { Request, Response } from "express";
import { addPotSchema } from "../validations/pots.validations.js";
import { BadRequest } from "../errors/errors.js";
import * as potsServices from "../services/pots.services.js";

export const addPot = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { data, success, error } = addPotSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }
  const pot = await potsServices.addPotService(userId, data);

  res.status(201).json({
    success: true,
    message: "Pot added successfully",
    data: {
      pot,
    },
  });
};
