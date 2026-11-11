import { describe, test, expect } from "vitest";
import { generateCryptoToken } from "../../utils/generateCryptoToken.js";
import crypto from "crypto";

describe("generateCryptoToken", () => {
  test("generates a random crypto token and its hash", () => {
    const { cryptoToken, cryptoTokenHash } = generateCryptoToken();

    expect(cryptoToken).not.toBe(cryptoTokenHash);
  });

  test("generates different random tokens on each call", () => {
    const token1 = generateCryptoToken();
    const token2 = generateCryptoToken();

    expect(token1.cryptoToken).not.toBe(token2.cryptoToken);
  });

  test("hash matches its token", () => {
    const { cryptoToken, cryptoTokenHash } = generateCryptoToken();
    const myHash = crypto
      .createHash("sha256")
      .update(cryptoToken)
      .digest("hex");

    expect(myHash).toBe(cryptoTokenHash);
  });
});
