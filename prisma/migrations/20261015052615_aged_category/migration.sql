/*
  Warnings:

  - The `agedCategory` column on the `CompetitionRegistration` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AgedCategories" AS ENUM ('default', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'U24', 'MASTERS_ELITE');

-- AlterTable
ALTER TABLE "CompetitionRegistration" DROP COLUMN "agedCategory",
ADD COLUMN     "agedCategory" "AgedCategories" NOT NULL DEFAULT 'default';
