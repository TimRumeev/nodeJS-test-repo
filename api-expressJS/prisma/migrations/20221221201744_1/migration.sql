/*
  Warnings:

  - You are about to drop the column `description` on the `ProductModel` table. All the data in the column will be lost.
  - Added the required column `amount` to the `ProductModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL
);
INSERT INTO "new_ProductModel" ("id", "name") SELECT "id", "name" FROM "ProductModel";
DROP TABLE "ProductModel";
ALTER TABLE "new_ProductModel" RENAME TO "ProductModel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
