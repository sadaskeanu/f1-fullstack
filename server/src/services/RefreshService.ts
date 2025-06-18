import prisma from "../config/db";
import { fetchWorldChampion, mapToWorldChampion } from "./WorldChampionService";
import { fetchRaceChampions, mapToRaceChampions } from "./RaceChampionService";
import { delay } from "../utils/time/delay";
import { retry } from "../utils/time/retry";
import getRedis from "../config/redis";
import { REFRESH_SOURCES } from "../constants/constants";
import { RefreshSource } from "../constants/constants";

/**
 * Refreshes all stored F1 season data in the database and cache.
 *
 * Overview:
 * - This function refetches full F1 season data (world champions + race winners) from the external Ergast API.
 * - Data is fully normalized and persisted into PostgreSQL (via Prisma).
 * - Redis cache keys for seasons and race winners are cleared after refresh, ensuring fresh reads on next requests.
 * - Retry logic with exponential backoff is applied to handle external API failures gracefully.
 *
 * Refresh triggers:
 * - Scheduled automatically via Bull queue (e.g. every Monday after race weekends).
 * - Can be triggered manually at deployment using `REFRESH_ON_DEPLOY=true` env variable.
 *
 * Why we use both:
 * - The scheduled job ensures regular refreshes after races.
 * - The deploy-time flag gives us manual control when deploying after new race results.
 * - This setup guarantees both reliable automation and operational flexibility.
 *
 * After completion, the function also stores metadata in Redis:
 * - `lastRefreshedAt` → timestamp of last successful refresh.
 * - `lastRefreshSource` → who triggered the refresh (manual, deploy, cron).
 *
 * @param refreshSource - Indicates who triggered the refresh (deploy, manual, cron, unknown).
 */

export async function refreshSeasonsData(
  refreshSource: RefreshSource = REFRESH_SOURCES.UNKNOWN
): Promise<void> {
  console.log(`Starting refreshSeasonsData (source: ${refreshSource})...`);

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
        5,
        baseDelay
      );
      const world = mapToWorldChampion(worldRaw);

      const raceRaw = await retry(
        () => fetchRaceChampions(season),
        5,
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

  const redis = getRedis();
  await redis.set("lastRefreshedAt", new Date().toISOString());
  await redis.set("lastRefreshSource", refreshSource);
}
