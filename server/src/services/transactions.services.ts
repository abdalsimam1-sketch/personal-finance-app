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

export const getTransactionsService = async (
  userId: string,
  page: number,
  limit: number,
  search?: string,
  filter?: string,
  category?: string,
) => {
  const skip = (page - 1) * limit;
  const take = limit;
  const where: any = {
    userId,
  };
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }
  if (category) {
    where.category = category;
  }

  let orderBy: any = { date: "desc" };

  if (filter === "oldest") {
    orderBy = { date: "asc" };
  } else if (filter === "a-z") {
    orderBy = { name: "asc" };
  } else if (filter === "z-a") {
    orderBy = { name: "desc" };
  } else if (filter === "highest") {
    orderBy = { amount: "desc" };
  } else if (filter === "lowest") {
    orderBy = { amount: "asc" };
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy,
    skip,
    take,
  });
  const count = await prisma.transaction.count({ where });
  const totalPages = Math.ceil(count / take);

  return { transactions, count, totalPages };
};
