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

const password = "Addpot123$#";
const validUser = {
  id: "addpotid",
  name: "add pot",
  email: "addpot@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const validPot = {
  name: "add pot",
  target: 5000,
  color: "green",
  userId: validUser.id,
};

const agent = request.agent(app);
let user: any;

describe("POST /api/v1/pots", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await await prisma.pot.deleteMany();

    user = await prisma.user.create({
      data: validUser,
    });

    await agent.post("/api/v1/auth/login").send({
      email: user.email,
      password,
    });
  });
  beforeEach(async () => {
    await prisma.pot.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("accepts valid pot", async () => {
    const res = await agent.post("/api/v1/pots").send(validPot);

    expect(res.status).toBe(201);
  });

  test("rejects logged out user ", async () => {
    const res = await request(app).post("/api/v1/pots").send(validPot);

    expect(res.status).toBe(401);
  });

  test("rejects duplicate color", async () => {
    const res1 = await agent.post("/api/v1/pots").send(validPot);
    const res2 = await agent.post("/api/v1/pots").send({
      ...validPot,
      name: "duplicate color",
    });

    expect(res1.status).toBe(201);
    expect(res2.status).toBe(409);
  });

  test("rejects duplicate  name", async () => {
    const res1 = await agent.post("/api/v1/pots").send(validPot);
    const res2 = await agent.post("/api/v1/pots").send({
      ...validPot,
      color: "cyan",
    });

    expect(res1.status).toBe(201);
    expect(res2.status).toBe(409);
  });

  test("ignores a fake injected userId", async () => {
    const res = await agent.post("/api/v1/pots").send({
      ...validPot,
      userId: "faks user id",
    });

    expect(res.status).toBe(201);
  });

  test("rejects a negative target", async () => {
    const res = await agent.post("/api/v1/pots").send({
      ...validPot,
      target: -5000,
    });

    expect(res.status).toBe(400);
  });
});
