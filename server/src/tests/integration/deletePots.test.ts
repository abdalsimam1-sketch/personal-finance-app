import { app } from "../../app.js";
import { prisma } from "../../lib/prisma.js";
import request from "supertest";
import { describe, test, beforeAll, afterAll, expect } from "vitest";
import { hashPassword } from "../../utils/hashPassword.js";

const password = "Deletepot123$#";

const user1 = {
  id: "deletepotid1",
  name: "delete pot1",
  email: "deletepot1@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const pot1 = {
  id: "deletepotid1",
  name: "delete pot1",
  target: 5000,
  color: "green",
  userId: user1.id,
};

const user2 = {
  id: "deletepotid2",
  name: "delete pot2",
  email: "deletepot2@example.com",
  password: await hashPassword(password),
  isVerified: true,
};

const pot2 = {
  id: "deletepotid2",
  name: "delete pot2",
  target: 5000,
  color: "green",
  userId: user2.id,
};

let userOne: any;
let userTwo: any;

const agent = request.agent(app);
const agent1 = request.agent(app);

describe("DELETE /api/v1/pots/:id", () => {
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

  test("deletes a user's pot", async () => {
    const res = await agent.delete(`/api/v1/pots/${pot1.id}`);

    const pot = await prisma.pot.findUnique({
      where: { id: pot1.id },
    });

    expect(res.status).toBe(200);
    expect(res.body?.success).toBe(true);
    expect(pot).toBeNull();
  });

  test("rejects a logged out user", async () => {
    const res = await request(app).delete(`/api/v1/pots/${pot2.id}`);

    expect(res.status).toBe(401);
  });

  test("enforces row level security", async () => {
    const res = await agent.delete(`/api/v1/pots/${pot2.id}`);
    const pot = await prisma.pot.findUnique({
      where: { id: pot2.id },
    });

    expect(res.status).toBe(404);
    expect(pot).not.toBeNull();
  });
});
