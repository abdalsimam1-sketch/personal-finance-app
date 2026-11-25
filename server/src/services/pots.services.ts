import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import {
  BadRequest,
  Conflict,
  NotFound,
  Unauthorized,
} from "../errors/errors.js";

const checkPrismaErrors = (error: any): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const fields = JSON.stringify(error.meta ?? {});

      if (fields.includes("_name_")) {
        throw new Conflict("You already have a pot with that name.");
      }
      if (fields.includes("_color_")) {
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
};

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
    return checkPrismaErrors(error);
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

export const editPotService = async (
  userId: string,
  potId: string,
  { name, target, color }: { name: string; target: number; color: string },
) => {
  let pot = await prisma.pot.findFirst({
    where: {
      userId,
      id: potId,
    },
  });
  if (!pot) {
    throw new NotFound();
  }
  try {
    pot = await prisma.pot.update({
      where: {
        id: pot.id,
        userId,
      },
      data: {
        name,
        target,
        color,
      },
    });
    return pot;
  } catch (error) {
    return checkPrismaErrors(error);
  }
};

export const deletePotService = async (userId: string, potId: string) => {
  let pot = await prisma.pot.findFirst({
    where: {
      id: potId,
      userId,
    },
  });

  if (!pot) {
    throw new NotFound();
  }

  pot = await prisma.pot.delete({
    where: {
      id: pot.id,
      userId,
    },
  });

  return pot;
};
