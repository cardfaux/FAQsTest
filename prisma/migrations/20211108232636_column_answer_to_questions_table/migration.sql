/*
  Warnings:

  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dynamic" BOOLEAN NOT NULL DEFAULT false,
    "answer" TEXT NOT NULL,
    "faq_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Question_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "FAQ" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("created_at", "dynamic", "faq_id", "id", "title", "updated_at") SELECT "created_at", "dynamic", "faq_id", "id", "title", "updated_at" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE INDEX "Question_id_idx" ON "Question"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
