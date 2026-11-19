import type { Request, Response } from "express";
import * as transactionsServices from "../services/transactions.services.js";
import {
  addTransactionSchema,
  getTransactionsSchema,
} from "../validations/transactions.validations.js";
import { BadRequest } from "../errors/errors.js";

export const addTransaction = async (req: Request, res: Response) => {
  const userId = req.user!.id;
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

export const getTransactions = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const { error, data, success } = getTransactionsSchema.safeParse(req.query);

  if (!success) {
    throw new BadRequest(error.issues[0]?.message);
  }

  const { transactions, count, totalPages } =
    await transactionsServices.getTransactionsService(
      userId,
      data.page,
      data.limit,
      data.search,
      data.filter,
      data.category,
    );

  res.status(200).json({
    success: true,
    message: "Transactions found",
    data: {
      transactions,
      count,
      totalPages,
    },
  });
};
