import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });
const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";

const testuser = {
  name: "signup user",
  email: "signupuser@gmail.com",
  password: "Waterjuice123$#",
  confirmPassword: "Waterjuice123$#",
};

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/v1/auth/signup", () => {
  test("signup with valid signup form", async () => {
    const res = await request(app).post("/api/v1/auth/signup").send(testuser);

    expect(res.statusCode).toBe(201);
  });

  test("rejects signup with a missing field", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({ ...testuser, email: "" });

    expect(res.status).toBe(400);
  });

  test("rejects duplicate email", async () => {
    const { confirmPassword, ...userWithoutConfirmPassword } = testuser;
    await prisma.user.create({ data: userWithoutConfirmPassword });

    const res = await request(app).post("/api/v1/auth/signup").send(testuser);

    expect(res.status).toBe(409);
  });
});
