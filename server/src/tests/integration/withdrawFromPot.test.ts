import { app } from "../../app.js";
import { prisma } from "../../lib/prisma.js";
import request from "supertest";
import { describe, test, beforeAll, afterAll, expect } from "vitest";
import { hashPassword } from "../../utils/hashPassword.js";

const password = "Withdrawfrompot123$#";

const user1 = {
  id: "withdrawfrompotid1",
  name: "withdrawfrom pot1",
  email: "withdrawfrompot1@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const pot1 = {
  id: "withdrawfrompotid1",
  name: "withdrawfrom pot1",
  target: 5000,
  color: "green",
  userId: user1.id,
  totalSaved: 4000,
};

const user2 = {
  id: "withdrawfrompotid2",
  name: "withdrawfrom pot2",
  email: "withdrawfrompot2@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const pot2 = {
  id: "withdrawfrompotid2",
  name: "withdrawfrom pot2",
  target: 5000,
  color: "green",
  userId: user2.id,
  totalSaved: 4000,
};

let userOne: any;
let userTwo: any;

const agent = request.agent(app);
const agent1 = request.agent(app);

describe("PATCH /api/v1/pots/withdraw/:id", () => {
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
    const res = await agent.patch(`/api/v1/pots/withdraw/${pot1.id}`).send({
      amount: 100,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(200);
    expect(Number(pot?.totalSaved)).toBe(3900);
  });

  test("rejects negative amount", async () => {
    const res = await agent.patch(`/api/v1/pots/withdraw/${pot1.id}`).send({
      amount: -100,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(400);
    expect(Number(pot?.totalSaved)).toBe(3900);
  });

  test("enforces row level security", async () => {
    const res = await agent.patch(`/api/v1/pots/withdraw/${pot2.id}`).send({
      amount: 100,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot2.id,
        userId: userTwo.id,
      },
    });

    expect(res.status).toBe(404);
    expect(Number(pot?.totalSaved)).toBe(4000);
  });

  test("rejects amount over the saved balance", async () => {
    const res = await agent.patch(`/api/v1/pots/withdraw/${pot1.id}`).send({
      amount: 20000,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(400);
    expect(Number(pot?.totalSaved)).toBe(3900);
  });

  test("rejects logged out user", async () => {
    const res = await request(app)
      .patch(`/api/v1/pots/withdraw/${pot1.id}`)
      .send({
        amount: 20000,
      });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(401);
    expect(Number(pot?.totalSaved)).toBe(3900);
  });

  test("accepts withdrawing the full balance", async () => {
    const res = await agent.patch(`/api/v1/pots/withdraw/${pot1.id}`).send({
      amount: 3900,
    });

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(200);
    expect(Number(pot?.totalSaved)).toBe(0);
  });

  test("rejects missing amount", async () => {
    const res = await agent.patch(`/api/v1/pots/withdraw/${pot1.id}`).send();

    const pot = await prisma.pot.findFirst({
      where: {
        id: pot1.id,
        userId: userOne.id,
      },
    });

    expect(res.status).toBe(400);
    expect(Number(pot?.totalSaved)).toBe(0);
  });
});
