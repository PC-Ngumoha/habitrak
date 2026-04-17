/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Completion` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Completion_habitId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "Completion_date_key" ON "Completion"("date");
