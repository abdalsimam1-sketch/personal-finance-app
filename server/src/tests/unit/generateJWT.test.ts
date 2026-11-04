import { describe, test, expect } from "vitest";
import { generateJWT } from "../../utils/generateJWT.js";

describe("generateJWT", () => {
  test("generates access and refresh tokens", () => {
    const { accessToken, refreshToken } = generateJWT({
      id: "accessandtokens",
      email: "accessandrefreshtokens@gmail.com",
    });

    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  test("generates a different access and refresh tokens", () => {
    const { accessToken, refreshToken } = generateJWT({
      id: "accessandtokens",
      email: "accessandrefreshtokens@gmail.com",
    });

    expect(accessToken).not.toBe(refreshToken);
  });
});
