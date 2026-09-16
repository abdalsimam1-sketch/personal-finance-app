import { ConflictError } from "../errors/errors.js";
import { prisma } from "../lib/prisma.js";
import type { SignupForm } from "../types/signupForm.type.js";
import { hashPassword } from "../utils/hashPassword.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { generateCryptoTokenHash } from "../utils/generateCrytoToken.js";

export const signupService = async (signupForm: SignupForm) => {
  let userExists = await prisma.user.findUnique({
    where: {
      email: signupForm.email,
    },
  });
  if (userExists) {
    throw new ConflictError("User already exists");
  }
  const passwordHash = await hashPassword(signupForm.password);
  const { cryptoToken, cryptoTokenHash } = generateCryptoTokenHash();

  const user = await prisma.user.create({
    data: {
      name: signupForm.name,
      email: signupForm.email,
      password: passwordHash,
      verificationTokenHash: cryptoTokenHash,
      verificationTokenHashExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
    select: {
      name: true,
      email: true,
    },
  });
  //send email

  try {
    await sendVerificationEmail(user.email, cryptoToken);
  } catch (emailError) {
    console.error(emailError);
  }
  return user;
};
