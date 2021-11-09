/*
  Warnings:

  - Added the required column `description` to the `FAQ` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FAQ" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "dynamic" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "FAQ_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FAQ" ("created_at", "dynamic", "id", "slug", "title", "updated_at", "user_id") SELECT "created_at", "dynamic", "id", "slug", "title", "updated_at", "user_id" FROM "FAQ";
DROP TABLE "FAQ";
ALTER TABLE "new_FAQ" RENAME TO "FAQ";
CREATE UNIQUE INDEX "FAQ_slug_key" ON "FAQ"("slug");
CREATE INDEX "FAQ_slug_id_idx" ON "FAQ"("slug", "id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
