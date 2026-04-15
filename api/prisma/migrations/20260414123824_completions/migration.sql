-- CreateTable
CREATE TABLE "Completion" (
    "date" DATETIME NOT NULL,
    "habitId" INTEGER NOT NULL,
    CONSTRAINT "Completion_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Completion_date_key" ON "Completion"("date");
