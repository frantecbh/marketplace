-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_store" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "store";
DROP TABLE "store";
ALTER TABLE "new_store" RENAME TO "store";
CREATE UNIQUE INDEX "store_name_key" ON "store"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
