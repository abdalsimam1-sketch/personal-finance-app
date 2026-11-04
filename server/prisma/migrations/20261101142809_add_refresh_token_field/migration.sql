-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refeshTokenHash" TEXT,
ADD COLUMN     "refreshTokenHashExpiresAt" TIMESTAMP(3);
