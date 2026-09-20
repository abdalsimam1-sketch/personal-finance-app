import { describe, test, expect } from "vitest";
import { loginSchema } from "../../src/validation/auth.validations";

const validForm = {
  email: "logintest@gmail.com",
  password: "Waterjuice123$#",
};

describe("login validation schema", () => {
  test("accepts valid login form", () => {
    const { success } = loginSchema.safeParse(validForm);

    expect(success).toBe(true);
  });

  test("rejects missing field", () => {
    const { success } = loginSchema.safeParse({ ...validForm, email: "" });
    expect(success).toBe(false);
  });
});
