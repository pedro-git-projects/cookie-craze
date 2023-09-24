/*
  Warnings:

  - The primary key for the `ItemUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ItemUser` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ItemUser` table. All the data in the column will be lost.
  - Added the required column `assignedBy` to the `ItemUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ItemUser_userId_itemId_key";

-- AlterTable
ALTER TABLE "ItemUser" DROP CONSTRAINT "ItemUser_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL,
ADD CONSTRAINT "ItemUser_pkey" PRIMARY KEY ("userId", "itemId");
