import { describe, test, expect } from "vitest";
import { generateCryptoTokenHash } from "../../src/utils/generateCrytoToken";

describe("generate crypto token and hash", () => {
  test("generates a random crypto token and it's hash", () => {
    const { cryptoToken, cryptoTokenHash } = generateCryptoTokenHash();

    expect(cryptoToken).toBeDefined();
    expect(cryptoTokenHash).toBeDefined();
    expect(cryptoToken).not.toEqual(cryptoTokenHash);
  });
});
