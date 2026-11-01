-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verificationTokenHash" TEXT,
ADD COLUMN     "verificationTokenHashExpiresAt" TIMESTAMP(3);
