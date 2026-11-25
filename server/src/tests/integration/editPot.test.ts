import { app } from "../../app.js";
import { prisma } from "../../lib/prisma.js";
import request from "supertest";
import { describe, test, expect, afterAll, beforeAll } from "vitest";
import { hashPassword } from "../../utils/hashPassword.js";

const password = "Editpot123$#";
const validUser = {
  id: "editpotid",
  name: "edit pot",
  email: "editpot@example.com",
  password: await hashPassword(password),
  isVerified: true,
};
const validUser1 = {
  id: "editpotid1",
  name: "edit pot",
  email: "editpot1@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const validPot = {
  id: "validpotid",
  name: "edit pot",
  target: 5000,
  color: "green",
  userId: validUser.id,
};

const agent = request.agent(app);
const agent1 = request.agent(app);
let user: any;

describe("PATCH /api/v1/pots/:id", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.pot.deleteMany();

    user = await prisma.user.create({
      data: validUser,
    });

    await prisma.user.create({
      data: validUser1,
    });

    await prisma.pot.create({ data: validPot });

    await prisma.pot.create({
      data: {
        id: "validpotid1",
        name: "edit pot1",
        target: 5000,
        color: "peach",
        userId: validUser.id,
      },
    });

    const loginRes = await agent.post("/api/v1/auth/login").send({
      email: user.email,
      password,
    });

    const loginRes1 = await agent1.post("/api/v1/auth/login").send({
      email: validUser1.email,
      password,
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes1.status).toBe(200);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("lets a user edit his pot", async () => {
    const res = await agent
      .patch(`/api/v1/pots/${validPot.id}`)
      .send({ ...validPot, target: 1000 });

    const pot = await prisma.pot.findUnique({
      where: {
        id: validPot.id,
      },
    });

    expect(res.status).toBe(200);
    expect(Number(pot?.target)).toBe(1000);
  });

  test("rejects logged out user", async () => {
    const res = await request(app)
      .patch(`/api/v1/pots/${validPot.id}`)
      .send({ ...validPot, target: 1000 });

    expect(res.status).toBe(401);
  });

  test("rejects duplicate color", async () => {
    const res = await agent
      .patch(`/api/v1/pots/${validPot.id}`)
      .send({ ...validPot, color: "peach" });

    expect(res.status).toBe(409);
  });

  test("rejects duplicate name", async () => {
    const res = await agent
      .patch(`/api/v1/pots/${validPot.id}`)
      .send({ ...validPot, name: "edit pot1" });

    expect(res.status).toBe(409);
  });

  test("enforces row level security", async () => {
    const res = await agent1
      .patch(`/api/v1/pots/${validPot.id}`)
      .send({ ...validPot, color: "magenta" });

    expect(res.status).toBe(404);
  });
});
