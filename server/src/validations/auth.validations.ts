import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: z.email().trim().toLowerCase(),
    password: z
      .string()
      .min(8, "Must contain at least 8 characters")
      .regex(/[a-z]/, "Must contain a lowercase character")
      .regex(/[A-Z]/, "Must contain an uppercase character")
      .regex(/[0-9]/, "Must contain a digit")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special symbol"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] },
  );

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string(),
});

export const resendSchema = z.object({
  email: z.email().trim().toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Must contain at least 8 characters")
      .regex(/[a-z]/, "Must contain a lowercase character")
      .regex(/[A-Z]/, "Must contain an uppercase character")
      .regex(/[0-9]/, "Must contain a digit")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special symbol"),

    confirmNewPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmNewPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    },
  );
