import { app } from "../../app.js";
import { prisma } from "../../lib/prisma.js";
import { test, describe, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { hashPassword } from "../../utils/hashPassword.js";

const password = "Edittransaction123$#";

const validUser = {
  id: "validuserid",
  name: "Edit transaction user",
  email: "edittransaction@gmail.com",
  password: await hashPassword(password),
  isVerified: true,
};

const otherUser = {
  id: "otheruserid",
  name: "other transaction user",
  email: "othertransaction@gmail.com",
  password: await hashPassword(password),
  isVerified: true,
};

const validTransaction = {
  id: "testEdit",
  name: "Edit Transaction",
  date: new Date("2026-11-21"),
  category: "general",
  amount: 5000,
  type: "withdrawal",
  userId: validUser.id,
} as any;

const othersTransaction = {
  id: "otherEdit",
  name: "other edit Transaction",
  date: new Date("2026-11-21"),
  category: "general",
  amount: 5000,
  type: "withdrawal",
  userId: otherUser.id,
} as any;

let user: any;
let newUser: any;

const agent = request.agent(app);

describe("PATCH /api/v1/transactions/:id", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();

    user = await prisma.user.create({
      data: validUser,
    });

    newUser = await prisma.user.create({
      data: otherUser,
    });

    const loginRes = await agent.post("/api/v1/auth/login").send({
      email: user.email,
      password,
    });
    expect(loginRes.status).toBe(200);

    await prisma.transaction.create({
      data: validTransaction,
    });

    await prisma.transaction.create({
      data: othersTransaction,
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("edits a valid transaction", async () => {
    const res = await agent
      .patch(`/api/v1/transactions/${validTransaction.id}`)
      .send({ ...validTransaction, amount: 1000 });

    const updated = await prisma.transaction.findUnique({
      where: { id: validTransaction.id },
    });
    expect(res.status).toBe(200);
    expect(updated?.amount.toNumber()).toBe(1000);
  });

  test("rejects logged out user", async () => {
    const res = await request(app)
      .patch(`/api/v1/transactions/${validTransaction.id}`)
      .send({ ...validTransaction, amount: 1000 });

    expect(res.status).toBe(401);
  });

  test("enforces row level security", async () => {
    const res = await agent
      .patch(`/api/v1/transactions/${othersTransaction.id}`)
      .send({ ...validTransaction, amount: 1000 });

    const updated = await prisma.transaction.findUnique({
      where: { id: othersTransaction.id },
    });
    expect(res.status).toBe(404);
    expect(updated?.amount.toNumber()).toBe(othersTransaction.amount);
  });
});
