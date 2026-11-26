import { app } from "../../app.js";
import { prisma } from "../../lib/prisma.js";
import request from "supertest";
import { describe, test, beforeAll, afterAll, expect } from "vitest";
import { hashPassword } from "../../utils/hashPassword.js";

const password = "Addtopot123$#";

const user1 = {
  id: "addtopotid1",
  name: "addto pot1",
  email: "addtopot1@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const pot1 = {
  id: "addtopotid1",
  name: "addto pot1",
  target: 5000,
  color: "green",
  userId: user1.id,
};

const user2 = {
  id: "addtopotid2",
  name: "addto pot2",
  email: "addtopot2@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const pot2 = {
  id: "addtopotid2",
  name: "addto pot2",
  target: 5000,
  color: "green",
  userId: user2.id,
};

let userOne: any;
let userTwo: any;

const agent = request.agent(app);
const agent1 = request.agent(app);

describe("PATCH /api/v1/pots/add/:id", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.pot.deleteMany();

    userOne = await prisma.user.create({
      data: user1,
    });

    const loginRes1 = await agent.post("/api/v1/auth/login").send({
      email: userOne.email,
      password,
    });

    await prisma.pot.create({
      data: pot1,
    });

    userTwo = await prisma.user.create({
      data: user2,
    });

    const loginRes2 = await agent1.post("/api/v1/auth/login").send({
      email: userTwo.email,
      password,
    });

    await prisma.pot.create({
      data: pot2,
    });

    expect(loginRes1.status).toBe(200);
    expect(loginRes2.status).toBe(200);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("accepts valid amount", async () => {
    const res = await agent.patch(`/api/v1/pots/add/${pot1.id}`).send({
      amount: 2000,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(200);
    expect(Number(pot?.totalSaved)).toBe(2000);
  });

  test("rejects negative amount", async () => {
    const res = await agent.patch(`/api/v1/pots/add/${pot1.id}`).send({
      amount: -2000,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(400);
    expect(Number(pot?.totalSaved)).toBe(2000);
  });

  test("enforces row level security", async () => {
    const res = await agent.patch(`/api/v1/pots/add/${pot2.id}`).send({
      amount: 2000,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot2.id,
        userId: userTwo.id,
      },
    });

    expect(res.status).toBe(404);
    expect(Number(pot?.totalSaved)).toBe(0);
  });

  test("rejects amount over the target", async () => {
    const res = await agent.patch(`/api/v1/pots/add/${pot1.id}`).send({
      amount: 20000,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });
    expect(res.status).toBe(400);
    expect(Number(pot?.totalSaved)).toBe(2000);
  });

  test("rejects logged out user", async () => {
    const res = await request(app).patch(`/api/v1/pots/add/${pot1.id}`).send({
      amount: 20000,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });
    expect(res.status).toBe(401);
    expect(Number(pot?.totalSaved)).toBe(2000);
  });

  test("accepts exact target amount", async () => {
    const res = await agent.patch(`/api/v1/pots/add/${pot1.id}`).send({
      amount: 3000,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });
    expect(res.status).toBe(200);
    expect(Number(pot?.totalSaved)).toBe(5000);
  });

  test("rejects missing amount", async () => {
    const res = await agent.patch(`/api/v1/pots/add/${pot1.id}`).send();

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(400);
    expect(Number(pot?.totalSaved)).toBe(5000);
  });
});
