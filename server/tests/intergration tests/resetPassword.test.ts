import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import request from "supertest";
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import { hashPassword } from "../../src/utils/hashPassword";
import { hashString } from "../../src/utils/sha256";

const testuser = {
  name: "reset password",
  email: "resetpassword@gmail.com",
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
      isVerified: true,
      resetPasswordTokenHash: hashString(testuser.resetPasswordToken),
      resetPasswordTokenHashExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/v1/auth/reset-password/:token", () => {
  test("reset password", async () => {
    const resetRes = await request(app)
      .post(`/api/v1/auth/reset-password/${testuser.resetPasswordToken}`)
      .send({
        newPassword: "Bossjuice123$#",
        confirmNewPassword: "Bossjuice123$#",
      });

    const oldLoginRes = await request(app).post("/api/v1/auth/login").send({
      email: testuser.email,
      password: testuser.password,
    });
    const newLoginRes = await request(app).post("/api/v1/auth/login").send({
      email: testuser.email,
      password: "Bossjuice123$#",
    });

    expect(resetRes.status).toBe(200);
    expect(oldLoginRes.status).toBe(400);
    expect(newLoginRes.status).toBe(200);
  });
});
