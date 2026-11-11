import { app } from "../../app.js";
import { describe, test, expect, vi, beforeEach, afterAll } from "vitest";
import { prisma } from "../../lib/prisma.js";
import request from "supertest";
import { sendVerificationEmail } from "../../utils/verificationEmail.js";

vi.mock("../../utils/verificationEmail.js", () => ({
  sendVerificationEmail: vi.fn(),
}));

const signupForm = {
  name: "signup",
  email: "signupemail@gmail.com",
  password: "Waterjuice123$#",
  confirmPassword: "Waterjuice123$#",
};

describe("POST /api/v1/auth/signup", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("accepts valid signup form", async () => {
    const res = await request(app).post("/api/v1/auth/signup").send(signupForm);

    expect(res.status).toBe(201);
    expect(sendVerificationEmail).toHaveBeenCalledOnce();
  });

  test("rejects duplicate email", async () => {
    const res1 = await request(app)
      .post("/api/v1/auth/signup")
      .send(signupForm);
    const res2 = await request(app)
      .post("/api/v1/auth/signup")
      .send(signupForm);

    expect(res1.status).toBe(201);
    expect(res2.status).toBe(409);
    expect(sendVerificationEmail).toHaveBeenCalledOnce();
  });

  test("rejects weak password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({ ...signupForm, password: "weak", confirmPassword: "weak" });

    expect(res.status).toBe(400);
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });
});
