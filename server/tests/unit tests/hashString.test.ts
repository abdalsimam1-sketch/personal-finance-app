import { describe, test, expect } from "vitest";

import { hashString } from "../../src/utils/sha256";

describe("hash string using sha256", () => {
  test("generates a real hash of any given string", () => {
    const hash = hashString("Waterjuice");

    expect(hash).toBeDefined();
    expect(hash).not.toEqual("Waterjuice");
  });
});
