-- CreateTable
CREATE TABLE "WorldChampion" (
    "id" SERIAL NOT NULL,
    "season" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "team" TEXT NOT NULL,

    CONSTRAINT "WorldChampion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceChampion" (
    "id" SERIAL NOT NULL,
    "season" INTEGER NOT NULL,
    "race" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "driverName" TEXT NOT NULL,
    "driverFamilyName" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "isWorldChampion" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RaceChampion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorldChampion_season_key" ON "WorldChampion"("season");

-- CreateIndex
CREATE INDEX "RaceChampion_season_idx" ON "RaceChampion"("season");

-- CreateIndex
CREATE UNIQUE INDEX "RaceChampion_season_race_key" ON "RaceChampion"("season", "race");

-- AddForeignKey
ALTER TABLE "RaceChampion" ADD CONSTRAINT "RaceChampion_season_fkey" FOREIGN KEY ("season") REFERENCES "WorldChampion"("season") ON DELETE RESTRICT ON UPDATE CASCADE;
