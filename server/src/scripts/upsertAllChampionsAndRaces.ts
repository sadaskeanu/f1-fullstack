import { upsertWorldChampion } from "../repositories/worldChampionRepo";
import { upsertRaceChampions } from "../repositories/raceChampionRepo";
import { delay } from "../utils/delay";

export async function runUpsertAll() {
  const startYear = 2005;
  const currentYear = new Date().getFullYear();

  console.log(`Starting upsert from ${startYear} to ${currentYear}`);
  for (let year = startYear; year <= currentYear; year++) {
    let attempts = 0;
    const maxRetries = 3;
    while (attempts < maxRetries) {
      try {
        const record = await upsertWorldChampion(year);
        console.log(`World Champion upserted for ${year}: ${record.driverId}`);
        break;
      } catch (error: any) {
        attempts++;
        const isRateLimit = error.message.includes("429");
        console.error(
          `World Champion attempt ${attempts} failed for ${year}: ${error.message}`
        );
        if (isRateLimit && attempts < maxRetries) {
          console.log(
            `Rate limited on ${year}, retrying in ${2000 * attempts}ms...`
          );
          await delay(2000 * attempts);
          continue;
        }
        console.error(
          `Failed to upsert World Champion for ${year} after ${attempts} attempts.`
        );
        break;
      }
    }
    await delay(100);
    try {
      await upsertRaceChampions(year);
      console.log(`Race winners upserted for ${year}`);
    } catch (err: any) {
      console.error(
        `Failed to upsert Race Winners for ${year}: ${err.message}`
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
