import z from "zod";

export const addPotSchema = z.object({
  name: z.string().trim().min(3).max(30),
  target: z.number().positive().max(9999999999),
  color: z.enum([
    "green",
    "cyan",
    "navy",
    "peach",
    "red",
    "purple",
    "brown",
    "magenta",
  ]),
});

export const addWithdrawSchema = z.object({
  amount: z.number().positive().max(9999999999),
});
