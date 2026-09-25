-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('email', 'google');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'email',
ADD COLUMN     "verificationTokenHash" TEXT,
ADD COLUMN     "verificationTokenHashExpiresAt" TIMESTAMP(3);
