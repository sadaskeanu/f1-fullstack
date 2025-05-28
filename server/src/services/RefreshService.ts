import prisma from "../config/db";
import redis from "../config/redis";
import { fetchWorldChampion, mapToWorldChampion } from "./WorldChampionService";
import { fetchRaceChampions, mapToRaceChampions } from "./RaceChampionService";

export async function refreshSeasonsData(): Promise<void> {
  console.log("Starting refreshSeasonsData...");

  const seasons = await prisma.worldChampion.findMany({
    select: { season: true },
    orderBy: { season: "asc" },
  });

  for (const { season } of seasons) {
    try {
      console.log(`Refreshing data for season ${season}...`);

      const worldRaw = await fetchWorldChampion(season);
      const world = mapToWorldChampion(worldRaw);

      const raceRaw = await fetchRaceChampions(season);
      const race = mapToRaceChampions(raceRaw, world.driverId);

      await prisma.worldChampion.upsert({
        where: { season },
        update: world,
        create: world,
      });

      await prisma.raceChampion.deleteMany({ where: { season } });
      await prisma.raceChampion.createMany({ data: race });

      await redis.del("seasons");
      await redis.del(`winners:${season}`);

      console.log(`Refreshed season ${season}`);
    } catch (err) {
      console.error(`Failed to refresh season ${season}:`, err);
    }
  }

  console.log("Finished refreshSeasonsData");
}
