/*
  Warnings:

  - You are about to drop the column `category` on the `CompetitionRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompetitionRegistration" DROP COLUMN "category",
ADD COLUMN     "experience" DECIMAL(65,30) NOT NULL DEFAULT 0;
