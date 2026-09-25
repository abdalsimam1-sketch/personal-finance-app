import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import request from "supertest";
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import { hashPassword } from "../../src/utils/hashPassword";
import { hashString } from "../../src/utils/sha256";

const testuser = {
  name: "verify email",
  email: "verifyemail@gmail.com",
  password: "Waterjuice123$#",
  verificationToken: "wateref",
};

beforeEach(async () => {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: testuser.name,
      email: testuser.email,
      password: await hashPassword(testuser.password),
      verificationTokenHash: hashString(testuser.verificationToken),
      verificationTokenHashExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/v1/auth/verify-email/:token", () => {
  test("verify email", async () => {
    const loginRes = await request(app).post("/api/v1/auth/login").send({
      email: testuser.email,
      password: testuser.password,
    });

    const res = await request(app).post(
      `/api/v1/auth/verify-email/${testuser.verificationToken}`,
    );

    const loginAfterVerification = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testuser.email,
        password: testuser.password,
      });

    expect(loginRes.status).toBe(401);
    expect(res.status).toBe(200);
    expect(loginAfterVerification.status).toBe(200);
  });
});
