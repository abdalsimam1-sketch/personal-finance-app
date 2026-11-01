import { describe, test, expect } from "vitest";
import { signupSchema } from "../../validations/auth.validations.js";

describe("signupSchema", () => {
  const signupForm = {
    name: "signup",
    email: "signupemail@gmail.com",
    password: "Waterjuice123$#",
    confirmPassword: "Waterjuice123$#",
  };

  test("passes valid signup form", () => {
    const { success } = signupSchema.safeParse(signupForm);

    expect(success).toBe(true);
  });

  test("rejects invalid name", () => {
    const { success } = signupSchema.safeParse({ ...signupForm, name: "ab" });

    expect(success).toBe(false);
  });

  test("rejects invalid email format", () => {
    const { success } = signupSchema.safeParse({
      ...signupForm,
      email: "signup",
    });
    expect(success).toBe(false);
  });

  test.each([
    ["too short", "Ab1"],
    ["no lowercase char", "WATERJUICE123$#"],
    ["no uppercase char", "waterjuice123$#"],
    ["no digit", "Waterjuice$#"],
    ["no special symbol", "Waterjuice123"],
  ])("rejects password %s", (_label, password) => {
    const result = signupSchema.safeParse({
      ...signupForm,
      password,
      confirmPassword: password,
    });
    expect(result.success).toBe(false);
  });

  test("rejects non matching confirm password", () => {
    const { success } = signupSchema.safeParse({
      ...signupForm,
      confirmPassword: "Mangojuice123$#",
    });

    expect(success).toBe(false);
  });
});
