-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetTokenHash" TEXT,
ADD COLUMN     "resetTokenHashExpiresAt" TIMESTAMP(3);
