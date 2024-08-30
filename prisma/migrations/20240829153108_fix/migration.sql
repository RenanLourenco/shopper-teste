/*
  Warnings:

  - You are about to drop the column `has_confimed` on the `Measure` table. All the data in the column will be lost.
  - Added the required column `has_confirmed` to the `Measure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measure" DROP COLUMN "has_confimed",
ADD COLUMN     "has_confirmed" BOOLEAN NOT NULL;
