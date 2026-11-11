import { test, expect, describe } from "vitest";
import { hashToken } from "../../utils/hashCryptoToken.js";

describe("hashToken", () => {
  test("hashes any passed token", () => {
    const token = "cryptotoken";
    const hash = hashToken(token);

    console.log(hash);
    console.log(token);

    expect(token).not.toBe(hash);
  });
});
