-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshTokenHash" TEXT,
ADD COLUMN     "refreshTokenHashExpiresAt" TIMESTAMP(3);
