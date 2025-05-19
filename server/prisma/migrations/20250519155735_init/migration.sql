-- CreateTable
CREATE TABLE "WorldChampion" (
    "season" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "team" TEXT NOT NULL,

    CONSTRAINT "WorldChampion_pkey" PRIMARY KEY ("season")
);

-- CreateTable
CREATE TABLE "RaceChampion" (
    "id" SERIAL NOT NULL,
    "season" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "driverName" TEXT NOT NULL,
    "driverFamilyName" TEXT NOT NULL,
    "team" TEXT NOT NULL,

    CONSTRAINT "RaceChampion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RaceChampion_season_idx" ON "RaceChampion"("season");

-- AddForeignKey
ALTER TABLE "RaceChampion" ADD CONSTRAINT "RaceChampion_season_fkey" FOREIGN KEY ("season") REFERENCES "WorldChampion"("season") ON DELETE RESTRICT ON UPDATE CASCADE;
