import { describe, test, expect } from "vitest";
import { hashPassword } from "../../src/utils/hashPassword";

describe("hash passowrd", () => {
  test("returns a hashed password", async () => {
    const password = "Waterjuice123$#";
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toEqual(password);
  });

  test("returns a different hash everytime", async () => {
    const password = "Waterjuice123$#";
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    expect(hash1).toBeDefined();
    expect(hash2).toBeDefined();
    expect(hash1).not.toEqual(hash2);
  });
});
