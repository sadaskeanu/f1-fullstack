import prisma from "../config/db";
import { fetchWorldChampion, mapToWorldChampion } from "./WorldChampionService";
import { fetchRaceChampions, mapToRaceChampions } from "./RaceChampionService";
import { delay } from "../time/delay";
import { retry } from "../time/retry";
import getRedis from "../config/redis";

export async function refreshSeasonsData(): Promise<void> {
  console.log("Starting refreshSeasonsData...");

  const seasons = await prisma.worldChampion.findMany({
    select: { season: true },
    orderBy: { season: "asc" },
  });

  let baseDelay = 500;

  for (const { season } of seasons) {
    const redis = getRedis();
    console.log(`Refreshing data for season ${season}...`);

    try {
      const worldRaw = await retry(
        () => fetchWorldChampion(season),
        3,
        baseDelay
      );
      const world = mapToWorldChampion(worldRaw);

      const raceRaw = await retry(
        () => fetchRaceChampions(season),
        3,
        baseDelay
      );
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

      console.log(`✅ Refreshed season ${season}`);
      baseDelay = 500;
    } catch (err: any) {
      console.error(`❌ Failed to refresh season ${season}: ${err.message}`);
      baseDelay *= 2;
    }

    await delay(baseDelay);
  }

  console.log("Finished refreshSeasonsData");
}
