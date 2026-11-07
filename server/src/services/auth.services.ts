import { BadRequest, Conflict, Unauthorized } from "../errors/errors.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

//utils
import { hashPassword } from "../utils/hashPassword.js";
import { generateCryptoToken } from "../utils/generateCryptoToken.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";
import { generateJWT } from "../utils/generateJWT.js";
import { hashToken } from "../utils/hashCryptoToken.js";

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

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userExists) {
    throw new Unauthorized("Invalid credentials");
  }
  if (!userExists.password) {
    throw new Unauthorized("Invalid credentials");
  }
  const comparePassword = await bcrypt.compare(password, userExists.password);
  if (!comparePassword) {
    throw new Unauthorized("Invalid credentials");
  }
  if (!userExists.isVerified) {
    throw new Unauthorized("Verify Account");
  }

  const { accessToken, refreshToken } = generateJWT({
    id: userExists.id,
    email: userExists.email,
  });
  const hashedRefreshToken = hashToken(refreshToken);

  const user = await prisma.user.update({
    where: { email },
    data: {
      refreshTokenHash: hashedRefreshToken,
      refreshTokenHashExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return { user, accessToken, refreshToken };
};

export const googleCallbackService = async () => {};

export const rotateTokensService = async (refreshToken: string) => {
  const refreshTokenHash = hashToken(refreshToken);

  const userExists = await prisma.user.findFirst({
    where: {
      refreshTokenHash,
      refreshTokenHashExpiresAt: { gt: new Date() },
    },
  });
  if (!userExists) {
    throw new Unauthorized("Invalid or expired tokens");
  }
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generateJWT({
      id: userExists.id,
      email: userExists.email,
    });

  const newRefreshTokenHash = hashToken(newRefreshToken);

  const user = await prisma.user.update({
    where: {
      email: userExists.email,
    },
    data: {
      refreshTokenHash: newRefreshTokenHash,
      refreshTokenHashExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    select: {
      id: true,
      email: true,
      isVerified: true,
    },
  });

  return { user, newAccessToken, newRefreshToken };
};

export const verifyAccountService = async (token: string) => {
  const hashedToken = hashToken(token);

  const user = await prisma.user.findFirst({
    where: {
      verificationTokenHash: hashedToken,
      verificationTokenHashExpiresAt: { gt: new Date() },
    },
  });
  if (!user) {
    throw new Unauthorized("Invalid or expired tokens");
  }
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      isVerified: true,
      verificationTokenHash: null,
      verificationTokenHashExpiresAt: null,
    },
  });
};

export const logoutService = async (refreshToken: string) => {
  const hashedToken = hashToken(refreshToken);
  const user = await prisma.user.findFirst({
    where: {
      refreshTokenHash: hashedToken,
      refreshTokenHashExpiresAt: { gt: new Date() },
    },
  });
  if (!user) {
    throw new BadRequest("Invalid or expired tokens");
  }

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      refreshTokenHash: null,
      refreshTokenHashExpiresAt: null,
    },
  });
};
