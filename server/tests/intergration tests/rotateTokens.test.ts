import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import { hashPassword } from "../../src/utils/hashPassword";

const testuser = {
  name: "rotate tokens",
  email: "rotatetokens@gmail.com",
  password: "Watrerjuice",
};

beforeEach(async () => {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: testuser.name,
      email: testuser.email,
      password: await hashPassword(testuser.password),
      isVerified: true,
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/v1/auth/rotate-tokens", () => {
  test("rotate tokens", async () => {
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: testuser.email, password: testuser.password });

    const loginCookies = loginRes.headers["set-cookie"];

    await new Promise((r) => setTimeout(r, 1100));

    const res = await request(app)
      .post("/api/v1/auth/rotate-tokens")
      .set("Cookie", loginCookies);
    const rotatedCookies = res.headers["set-cookie"];

    expect(res.status).toBe(200);
    expect(loginRes.status).toBe(200);
    expect(loginCookies).toBeDefined();
    expect(rotatedCookies).toBeDefined();
    expect(loginCookies).not.toEqual(rotatedCookies);
  });
});
