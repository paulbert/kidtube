/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Group";

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);
