/*
  Warnings:

  - A unique constraint covering the columns `[season,race]` on the table `RaceChampion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `race` to the `RaceChampion` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RaceChampion_season_idx";

-- AlterTable
ALTER TABLE "RaceChampion" ADD COLUMN     "isWorldChampion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "race" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RaceChampion_season_race_key" ON "RaceChampion"("season", "race");
