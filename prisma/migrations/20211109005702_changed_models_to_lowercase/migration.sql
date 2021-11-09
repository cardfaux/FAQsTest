/*
  Warnings:

  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FAQ";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Plan";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Question";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "store" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "plan_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "user_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "dynamic" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "faq_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dynamic" BOOLEAN NOT NULL DEFAULT false,
    "answer" TEXT NOT NULL,
    "faq_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "question_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "faq" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_store_key" ON "user"("store");

-- CreateIndex
CREATE INDEX "user_store_idx" ON "user"("store");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "plan"("slug");

-- CreateIndex
CREATE INDEX "plan_slug_id_idx" ON "plan"("slug", "id");

-- CreateIndex
CREATE UNIQUE INDEX "FAQ_slug_key" ON "faq"("slug");

-- CreateIndex
CREATE INDEX "faq_slug_id_idx" ON "faq"("slug", "id");

-- CreateIndex
CREATE INDEX "question_id_idx" ON "question"("id");
