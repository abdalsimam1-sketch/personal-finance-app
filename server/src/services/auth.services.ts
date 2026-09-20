import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../errors/errors.js";
import { prisma } from "../lib/prisma.js";
import type { SignupForm } from "../types/signupForm.type.js";
import { hashPassword } from "../utils/hashPassword.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { generateCryptoTokenHash } from "../utils/generateCrytoToken.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/generateTokens.js";
import { hashString } from "../utils/sha256.js";

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

export const loginService = async (loginForm: {
  email: string;
  password: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: loginForm.email,
    },
  });
  if (!existingUser) {
    throw new BadRequestError("Invalid email or password");
  }
  if (!existingUser.password) {
    throw new BadRequestError("Invalid email or password");
  }
  const matchingPasswords = await bcrypt.compare(
    loginForm.password,
    existingUser.password,
  );
  if (!matchingPasswords) {
    throw new BadRequestError("Invalid email or password");
  }
  if (!existingUser.isVerified) {
    throw new UnauthorizedError("User not verified");
  }
  const { accessToken, refreshToken } = generateTokens({
    id: existingUser.id,
    email: existingUser.email,
  });
  const refreshTokenHash = hashString(refreshToken);

  const user = await prisma.user.update({
    where: {
      email: loginForm.email,
    },
    data: {
      refreshTokenHash,
      refreshTokenHashExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return { accessToken, refreshToken, user };
};
