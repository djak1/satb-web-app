/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Fighter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompetitionRegistration" ADD COLUMN     "agedCategory" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "weightCategory" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Fighter" DROP COLUMN "dateOfBirth",
ADD COLUMN     "yearOfBirth" INTEGER NOT NULL DEFAULT 0;
