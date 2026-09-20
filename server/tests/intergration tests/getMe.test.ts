import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import { hashPassword } from "../../src/utils/hashPassword";
import request from "supertest";

const testuser = {
  name: "get me",
  email: "getme@gmail.com",
  password: "Waterjuice123$#",
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

describe("GET /api/v1/auth/me", () => {
  test("get existing user ", async () => {
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: testuser.email, password: testuser.password });

    const cookies = loginRes.headers["set-cookie"];

    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Cookie", cookies);

    expect(cookies).toBeDefined();
    expect(res.status).toBe(200);
  });
});
