import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { BadRequest, Conflict, Unauthorized } from "../errors/errors.js";

export const addPotService = async (
  userId: string,
  { name, color, target }: { name: string; color: string; target: number },
) => {
  const maxPots = 8;
  const count = await prisma.pot.count({ where: { userId } });
  if (count >= maxPots) {
    throw new BadRequest("Sorry, can only have a max of 8 pots");
  }

  try {
    const pot = await prisma.pot.create({
      data: {
        name,
        color,
        target,
        userId,
      },
    });
    return pot;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = JSON.stringify(error.meta ?? {});

        if (fields.includes("name")) {
          throw new Conflict("You already have a pot with that name.");
        }
        if (fields.includes("color")) {
          throw new Conflict(
            "This color has already been assigned to another pot, please choose another one.",
          );
        }
      }
      if (error.code === "P2003") {
        throw new Unauthorized("Invalid or expired tokens");
      }
    }
    throw error;
  }
};

export const getPotsService = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const pots = await prisma.pot.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
  });

  const count = await prisma.pot.count({ where: { userId } });
  const totalPages = Math.ceil(count / take);

  return { pots, count, totalPages };
};
