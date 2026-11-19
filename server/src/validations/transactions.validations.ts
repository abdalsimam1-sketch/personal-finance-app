import z from "zod";

export const categories = [
  "entertainment",
  "bills",
  "groceries",
  "dining_out",
  "transportation",
  "personal_care",
  "education",
  "lifestyle",
  "shopping",
  "general",
] as const;

export const addTransactionSchema = z.object({
  name: z.string().trim().min(3).max(50),
  amount: z.coerce.number().positive().max(1000000000).multipleOf(0.01),
  date: z.coerce.date(),
  category: z.enum(categories),
  type: z.enum(["addition", "withdrawal"]),
});

export const getTransactionsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  category: z.enum(categories).optional(),
  filter: z
    .enum(["newest", "oldest", "a-z", "z-a", "highest", "lowest"])
    .default("newest"),
});
