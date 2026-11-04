import { app } from "../../app.js";
import request from "supertest";
import { prisma } from "../../lib/prisma.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { describe, test, expect, beforeEach, afterAll } from "vitest";

const loginForm = {
  name: "login",
  email: "loginemail@gmail.com",
  password: "Waterjuice123$#",
  isVerified: true,
};

describe("POST /api/v1/auth/login", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        name: loginForm.name,
        email: loginForm.email,
        password: await hashPassword(loginForm.password),
        isVerified: loginForm.isVerified,
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("logs in a valid user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: loginForm.email,
      password: loginForm.password,
    });

    const cookies = res.headers["set-cookie"] as unknown as string[];

    expect(res.status).toBe(200);
    expect(cookies).toBeDefined();
    expect(cookies.join(";")).toContain("accessToken=");
    expect(cookies.join(";")).toContain("refreshToken=");
  });

  test("rejects wrong password", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: loginForm.email,
      password: "Bossjuice123$#",
    });

    expect(res.status).toBe(401);
  });

  test("rejects non existing user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "nonexisitingemail@gmail.com",
      password: "Bossjuice123$#",
    });

    expect(res.status).toBe(401);
  });

  test("rejects unverified user", async () => {
    await prisma.user.update({
      where: {
        email: loginForm.email,
      },
      data: {
        isVerified: false,
      },
    });
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: loginForm.email, password: loginForm.password });

    expect(res.status).toBe(401);
  });
});
