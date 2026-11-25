/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Pot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pot_userId_name_key" ON "Pot"("userId", "name");
