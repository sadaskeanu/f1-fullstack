import { upsertWorldChampion } from "../repositories/worldChampionRepo";
import { upsertRaceChampions } from "../repositories/raceChampionRepo";
import { delay } from "../time/delay";
import { retry } from "../time/retry";

/**
 * Script to upsert all F1 world champions and race winners from 2005 to current year.
 * - Uses retry logic for robustness and delay between requests to avoid rate limits.
 * - Upserts world champion first, then race winners for each year.
 */

export async function runUpsertAll() {
  const startYear = 2005;
  const currentYear = new Date().getFullYear();

  console.log(`Starting upsert from ${startYear} to ${currentYear}`);

  for (let year = startYear; year <= currentYear; year++) {
    try {
      const record = await retry(() => upsertWorldChampion(year));
      console.log(`World Champion upserted for ${year}: ${record.driverId}`);
    } catch (error: any) {
      console.error(
        `Failed to upsert World Champion for ${year}: ${error.message}`
      );
    }

    await delay(100);

    try {
      await retry(() => upsertRaceChampions(year));
      console.log(`Race winners upserted for ${year}`);
    } catch (error: any) {
      console.error(
        `Failed to upsert Race Winners for ${year}: ${error.message}`
      );
    }

    await delay(200);
  }

  console.log("Completed upsert of all seasons and races.");
}

if (require.main === module) {
  runUpsertAll()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Fatal error in upsert script:", err);
      process.exit(1);
    });
}
