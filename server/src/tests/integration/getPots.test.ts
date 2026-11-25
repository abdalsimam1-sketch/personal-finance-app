import { app } from "../../app.js";
import request from "supertest";
import { prisma } from "../../lib/prisma.js";
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
} from "vitest";
import { hashPassword } from "../../utils/hashPassword.js";

const password = "Getpot123$#";
const validUser = {
  id: "getpotid",
  name: "get pot",
  email: "getpot@example.com",
  password: await hashPassword(password),
  isVerified: true,
};
const validUser1 = {
  id: "getpotid1",
  name: "get pot1",
  email: "getpot1@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const validPot = {
  name: "get pot",
  target: 5000,
  color: "green",
  userId: validUser.id,
};
let user: any;
const agent = request.agent(app);
const agent1 = request.agent(app);

describe("GET /api/v1/auth", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.pot.deleteMany();

    user = await prisma.user.create({
      data: validUser,
    });

    await prisma.user.create({
      data: validUser1,
    });

    await prisma.pot.create({
      data: validPot,
    });

    const loginRes = await agent.post("/api/v1/auth/login").send({
      email: validUser.email,
      password,
    });
    const loginRes1 = await agent1.post("/api/v1/auth/login").send({
      email: validUser1.email,
      password,
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes1.status).toBe(200);
  });

  beforeEach(async () => {});
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("returns a users pots", async () => {
    const res = await agent.get("/api/v1/pots");
    const pots = await prisma.pot.findMany({
      where: {
        userId: user.id,
      },
    });

    expect(res.status).toBe(200);
    expect(res.body?.data?.pots).toHaveLength(1);
    expect(res.body?.data?.pots[0]?.id).toBe(pots[0]?.id);
  });

  test("rejects logged out user", async () => {
    const res = await request(app).get("/api/v1/pots");

    expect(res.status).toBe(401);
  });

  test("implemets row level security", async () => {
    const res = await agent1.get("/api/v1/pots");

    expect(res.status).toBe(200);
    expect(res.body?.data?.pots).toHaveLength(0);
  });
});
