/*
  Warnings:

  - Added the required column `storeId` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL,
    "metadata" TEXT,
    "storeId" TEXT NOT NULL
);
INSERT INTO "new_organization" ("createdAt", "id", "logo", "metadata", "name", "slug") SELECT "createdAt", "id", "logo", "metadata", "name", "slug" FROM "organization";
DROP TABLE "organization";
ALTER TABLE "new_organization" RENAME TO "organization";
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");
CREATE UNIQUE INDEX "organization_storeId_key" ON "organization"("storeId");
CREATE TABLE "new_stores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "banner" TEXT,
    "logoPublicId" TEXT,
    "bannerPublicId" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "addressId" TEXT NOT NULL,
    "productTypes" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    CONSTRAINT "stores_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stores_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stores" ("addressId", "banner", "bannerPublicId", "createdAt", "description", "email", "id", "isActive", "isApproved", "logo", "logoPublicId", "name", "phone", "productTypes", "updatedAt", "website") SELECT "addressId", "banner", "bannerPublicId", "createdAt", "description", "email", "id", "isActive", "isApproved", "logo", "logoPublicId", "name", "phone", "productTypes", "updatedAt", "website" FROM "stores";
DROP TABLE "stores";
ALTER TABLE "new_stores" RENAME TO "stores";
CREATE UNIQUE INDEX "stores_email_key" ON "stores"("email");
CREATE UNIQUE INDEX "stores_addressId_key" ON "stores"("addressId");
CREATE UNIQUE INDEX "stores_organizationId_key" ON "stores"("organizationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
