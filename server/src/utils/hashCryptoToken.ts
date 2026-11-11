import crypto from "crypto";

export const hashToken = (token: string) => {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return hash;
};
