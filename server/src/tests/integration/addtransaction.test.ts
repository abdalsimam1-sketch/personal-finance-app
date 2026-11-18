import { app } from "../../app.js";
import { prisma } from "../../lib/prisma.js";
import request from "supertest";
import {
  describe,
  test,
  expect,
  afterAll,
  beforeAll,
  beforeEach,
} from "vitest";
import { hashPassword } from "../../utils/hashPassword.js";

const password = "Addtransaction123$#";
const validUser = {
  name: "Add transaction test",
  email: "addtransaction@gmail.com",
  isVerified: true,
  password: await hashPassword(password),
};

const validtransaction = {
  name: "Add transaction test",
  amount: 5000,
  date: "2026-11-18",
  category: "general",
  type: "withdrawal",
};

const agent = request.agent(app);

describe("POST /api/v1/transactions/", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: validUser,
    });

    await agent
      .post("/api/v1/auth/login")
      .send({ email: validUser.email, password })
      .expect(200);
  });

  beforeEach(async () => {
    await prisma.transaction.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: validUser.email } });
    await prisma.$disconnect();
  });

  test("accepts valid transaction", async () => {
    const res = await agent.post("/api/v1/transactions").send(validtransaction);
    expect(res.status).toBe(201);
  });

  test("rejects unlogged in user", async () => {
    const res = await request(app)
      .post("/api/v1/transactions")
      .send(validtransaction);
    expect(res.status).toBe(401);
  });

  test("rejects negative amount", async () => {
    const res = await agent
      .post("/api/v1/transactions")
      .send({ ...validtransaction, amount: -5000 });
    expect(res.status).toBe(400);
  });

  test("rejects bad category", async () => {
    const res = await agent
      .post("/api/v1/transactions")
      .send({ ...validtransaction, category: "none category" });
    expect(res.status).toBe(400);
  });
});
