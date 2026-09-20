import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import request from "supertest";
import { describe, test, expect, afterAll, beforeEach } from "vitest";
import { hashPassword } from "../../src/utils/hashPassword";

const testuser = {
  name: "logout user",
  email: "logoutuser@gmail.com",
  password: "Waterjuice",
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

describe("POST /api/v1/auth/logout", () => {
  test("logout user", async () => {
    const loginRes = await request(app).post("/api/v1/auth/login").send({
      email: testuser.email,
      password: testuser.password,
    });
    const cookies = loginRes.headers["set-cookie"];
    const res = await request(app)
      .post("/api/v1/auth/logout")
      .set("Cookie", cookies);

    expect(res.status).toBe(200);
  });
});
