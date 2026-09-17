import { describe, test, expect } from "vitest";
import { signupSchema } from "../../src/validation/auth.validations";

const validForm = {
  name: "abdals",
  email: "abdals@example.com",
  password: "Waterjuice123$#",
  confirmPassword: "Waterjuice123$#",
};

describe("signup schema", () => {
  test("accepts a valid signup form", () => {
    const result = signupSchema.safeParse(validForm);

    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      ...validForm,
      email: "",
    });

    expect(result.success).toBe(false);
  });

  test("rejects name with less than 5 characters", () => {
    const result = signupSchema.safeParse({ ...validForm, name: "abc" });

    expect(result.success).toBe(false);
  });

  test("rejects non matching confirm password", () => {
    const result = signupSchema.safeParse({
      ...validForm,
      confirmPassword: "Waterslime123$#",
    });

    expect(result.success).toBe(false);
  });
});
