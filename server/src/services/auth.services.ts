import { Conflict } from "../errors/errors.js";
import { prisma } from "../lib/prisma.js";

//utils
import { hashPassword } from "../utils/hashPassword.js";
import { generateCryptoToken } from "../utils/generateCryptoToken.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";

export const signupService = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    throw new Conflict();
  }
  const hashedPassword = await hashPassword(password);

  const { cryptoToken, cryptoTokenHash } = generateCryptoToken();

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationTokenHash: cryptoTokenHash,
      verificationTokenHashExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
    select: {
      name: true,
      id: true,
      email: true,
    },
  });

  await sendVerificationEmail(cryptoToken, user.email);

  return user;
};
