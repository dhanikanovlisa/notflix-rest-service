/*
  Warnings:

  - You are about to drop the column `user_id` on the `Film` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Film" DROP CONSTRAINT "Film_user_id_fkey";

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "user_id";
