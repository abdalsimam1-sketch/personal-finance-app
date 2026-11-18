import { prisma } from "../lib/prisma.js";

export const addTransactionService = async (
  userId: string,
  {
    name,
    amount,
    date,
    category,
    type,
  }: {
    name: string;
    amount: number;
    date: Date;
    category:
      | "entertainment"
      | "bills"
      | "groceries"
      | "dining_out"
      | "transportation"
      | "personal_care"
      | "education"
      | "lifestyle"
      | "shopping"
      | "general";
    type: "addition" | "withdrawal";
  },
) => {
  const transaction = await prisma.transaction.create({
    data: {
      name,
      amount,
      userId,
      date,
      category,
      type,
    },
  });
  return transaction;
};
