/*
  Warnings:

  - The primary key for the `Measure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `Measure` table. All the data in the column will be lost.
  - Added the required column `has_confimed` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - The required column `measure_uuid` was added to the `Measure` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_pkey",
DROP COLUMN "uuid",
ADD COLUMN     "has_confimed" BOOLEAN NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "measure_uuid" TEXT NOT NULL,
ADD CONSTRAINT "Measure_pkey" PRIMARY KEY ("measure_uuid");
