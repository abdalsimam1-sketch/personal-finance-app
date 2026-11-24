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

const password = "Gettransaction123$#";
const validUser = {
  name: "get transactions test",
  email: "gettransaction@gmail.com",
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

let user: any;

const agent = request.agent(app);

describe("GET /api/v1/transactions", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();

    user = await prisma.user.create({
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

  test("returns transactions of a logged in user", async () => {
    const res = await agent.get("/api/v1/transactions");

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
    });

    expect(res.status).toBe(200);
    expect(res.body.data.transactions).toEqual(transactions);
  });

  test("rejects logged out user", async () => {
    const res = await request(app).get("/api/v1/transactions");

    expect(res.status).toBe(401);
  });
});
