/*
  Warnings:

  - You are about to drop the column `refeshTokenHash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refeshTokenHash",
ADD COLUMN     "refreshTokenHash" TEXT;
