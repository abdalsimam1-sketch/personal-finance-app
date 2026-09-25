import crypto from "crypto";

export const generateCryptoTokenHash = () => {
  const cryptoToken = crypto.randomBytes(32).toString("hex");
  const cryptoTokenHash = crypto
    .createHash("sha256")
    .update(cryptoToken)
    .digest("hex");

  return { cryptoToken, cryptoTokenHash };
};
