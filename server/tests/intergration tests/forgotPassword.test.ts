import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import request from "supertest";
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import { hashPassword } from "../../src/utils/hashPassword";
import { hashString } from "../../src/utils/sha256";

const testuser = {
  name: "forgot password",
  email: "forgotpassword@gmail.com",
  password: "Waterjuice123$#",
  resetPasswordToken: "wateref",
};

beforeEach(async () => {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: testuser.name,
      email: testuser.email,
      password: await hashPassword(testuser.password),
      resetPasswordTokenHash: hashString(testuser.resetPasswordToken),
      resetPasswordTokenHashExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/v1/auth/forgot-password", () => {
  test("send reset password email", async () => {
    const res = await request(app).post("/api/v1/auth/forgot-password").send({
      email: testuser.email,
    });

    const updatedUser = await prisma.user.findUnique({
      where: {
        email: testuser.email,
      },
      select: {
        resetPasswordTokenHash: true,
      },
    });

    expect(res.status).toBe(200);
    expect(updatedUser?.resetPasswordTokenHash).not.toEqual(
      hashString(testuser.resetPasswordToken),
    );
  });
});
