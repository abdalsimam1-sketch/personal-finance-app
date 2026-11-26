import type { Request, Response } from "express";
import {
  addPotSchema,
  addWithdrawSchema,
} from "../validations/pots.validations.js";
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

export const getPots = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { page = 1, limit = 10 } = req.query as any;
  const { pots, count, totalPages } = await potsServices.getPotsService(
    userId,
    page,
    limit,
  );

  res.status(200).json({
    success: true,
    message: "Pots found",
    data: {
      pots,
      count,
      totalPages,
    },
  });
};

export const editPot = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const potId = req.params.id as string;
  const { success, data, error } = addPotSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }
  const pot = await potsServices.editPotService(userId, potId, {
    name: data.name,
    target: data.target,
    color: data.color,
  });

  res.status(200).json({
    success: true,
    message: "Pot edited successfully",
    data: {
      pot,
    },
  });
};

export const deletePot = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const potId = req.params.id as string;

  const pot = await potsServices.deletePotService(userId, potId);

  res.status(200).json({
    success: true,
    message: "Pot deleted successfully",
    data: { pot },
  });
};

export const addToPot = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const potId = req.params.id as string;

  const { data, success, error } = addWithdrawSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }

  const pot = await potsServices.addToPotService(userId, potId, data.amount);

  res.status(200).json({
    success: true,
    message: "Money added to pot",
    data: {
      pot,
    },
  });
};

export const withdrawFromPot = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const potId = req.params.id as string;
  const { data, error, success } = addWithdrawSchema.safeParse(req.body);

  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }

  const pot = await potsServices.withdrawFromPotService(
    userId,
    potId,
    data.amount,
  );

  res.status(200).json({
    success: true,
    message: "Money withdrawn from pot",
    data: {
      pot,
    },
  });
};
