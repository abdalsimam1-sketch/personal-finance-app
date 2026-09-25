-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordTokenHash" TEXT,
ADD COLUMN     "resetPasswordTokenHashExpiresAt" TIMESTAMP(3);
