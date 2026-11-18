import type { Request, Response } from "express";
import * as transactionsServices from "../services/transactions.services.js";
import { addTransactionSchema } from "../validations/transactions.validations.js";
import { BadRequest } from "../errors/errors.js";

export const addTransaction = async (req: any, res: Response) => {
  const userId = req.user?.id as any;
  const { error, data, success } = addTransactionSchema.safeParse(req.body);
  if (!success) {
    throw new BadRequest(error?.issues[0]?.message);
  }
  const transaction = await transactionsServices.addTransactionService(
    userId,
    data,
  );

  res.status(201).json({
    success: true,
    message: "Transaction created",
    data: {
      transaction,
    },
  });
};
