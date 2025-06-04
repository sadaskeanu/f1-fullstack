import prisma from "../config/db";
import { upsertWorldChampion } from "../repositories/worldChampionRepo";
import { upsertRaceChampions } from "../repositories/raceChampionRepo";
import { delay } from "../time/delay";
import { retry } from "../time/retry";
import { START_YEAR } from "../constants/constants";

/**
 * Script to upsert missing or incomplete F1 data + always refresh current season.
 * - Skips fully populated past seasons.
 * - Ensures current season is refreshed every time.
 */
export async function runUpsertAll() {
  const startYear = START_YEAR;
  const currentYear = new Date().getFullYear();

  console.log(`Checking seasons in DB...`);

  const worldChamps = await prisma.worldChampion.findMany({
    select: { season: true },
  });
  const raceCounts = await prisma.raceChampion.groupBy({
    by: ["season"],
    _count: true,
  });

  const existingWorldSeasons = new Set(worldChamps.map((s) => s.season));
  const completedRaces = new Set(
    raceCounts.filter((r) => r._count > 0).map((r) => r.season)
  );

  for (let year = startYear; year <= currentYear; year++) {
    const isCurrentSeason = year === currentYear;
    const isWorldChampionMissing = !existingWorldSeasons.has(year);
    const isRaceWinnersMissing = !completedRaces.has(year);

    if (!isCurrentSeason && !isWorldChampionMissing && !isRaceWinnersMissing) {
      console.log(`✅ Skipping ${year} — already complete`);
      continue;
    }

    console.log(`🔄 Processing ${year}...`);

    try {
      const record = await retry(() => upsertWorldChampion(year));
      console.log(`🏆 World Champion upserted for ${year}: ${record.driverId}`);
    } catch (error: any) {
      console.error(
        `❌ Failed to upsert World Champion for ${year}: ${error.message}`
      );
    }

    await delay(100);

    try {
      await retry(() => upsertRaceChampions(year));
      console.log(`🏁 Race winners upserted for ${year}`);
    } catch (error: any) {
      console.error(
        `❌ Failed to upsert Race Winners for ${year}: ${error.message}`
      );
    }

    await delay(200);
  }

  console.log("🎉 Completed upsert of all required seasons.");
}

if (require.main === module) {
  runUpsertAll()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Fatal error in upsert script:", err);
      process.exit(1);
    });
}
