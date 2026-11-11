import { describe, test, expect } from "vitest";
import { hashPassword } from "../../utils/hashPassword.js";

describe("hash password", () => {
  const password = "Waterjuice123$#";
  test("produces hash different from plain password", async () => {
    const hashedPassword = await hashPassword(password);

    expect(password).not.toBe(hashedPassword);
  });

  test("produces hash different hash everytime", async () => {
    const hashedPassword = await hashPassword(password);
    const hashedPassword1 = await hashPassword(password);

    expect(hashedPassword).not.toBe(hashedPassword1);
  });
});
