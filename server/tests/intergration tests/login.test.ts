import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
} from "vitest";

const { app } = await import("../../src/app");
const { prisma } = await import("../../src/lib/prisma");
import request from "supertest";
import { hashPassword } from "../../src/utils/hashPassword";

const testuser = {
  name: "login user",
  email: "loginuser@gmail.com",
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

describe("POST /api/v1/auth/login", () => {
  test("login with valid login form", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: testuser.email, password: testuser.password });

    expect(res.status).toBe(200);
  });

  test("rejects unverified user", async () => {
    await prisma.user.update({
      where: {
        email: testuser.email,
      },
      data: { isVerified: false },
    });
    const res = await request(app).post("/api/v1/auth/login").send(testuser);

    expect(res.status).toBe(401);
  });

  test("rejects missing field", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "",
      password: testuser.password,
    });

    expect(res.status).toBe(400);
  });

  test("rejects non existing user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "nonexistinguser@gmail.com",
      password: "Waterjuice123$#",
    });

    expect(res.status).toBe(400);
  });
});
