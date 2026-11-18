import z from "zod";

export const addTransactionSchema = z.object({
  name: z.string().trim().min(3).max(50),
  amount: z.coerce.number().positive().max(1000000000).multipleOf(0.01),
  date: z.coerce.date(),
  category: z.enum([
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
  ]),
  type: z.enum(["addition", "withdrawal"]),
});
