import { upsertWorldChampion } from "../services/worldChampionRepo";
import { delay } from "../utils/delay";

async function runUpsertAll() {
  const startYear = 2005;
  const currentYear = new Date().getFullYear();

  console.log(`Starting upsert from ${startYear} to ${currentYear}`);
  for (let year = startYear; year <= currentYear; year++) {
    let attempts = 0;
    const maxRetries = 3;
    while (attempts < maxRetries) {
      try {
        const record = await upsertWorldChampion(year);
        console.log(`Upserted champion for ${year}: ${record.driverId}`);
        break;
      } catch (error: any) {
        attempts++;
        const isRateLimit = error.message.includes("429");
        console.error(
          `Attempt ${attempts} failed for ${year}: ${error.message}`
        );
        if (isRateLimit && attempts < maxRetries) {
          console.log(`Rate limited on ${year}, retrying after delay...`);
          await delay(2000 * attempts);
          continue;
        }
        console.error(`Failed to upsert ${year} after ${attempts} attempts.`);
        break;
      }
    }
    await delay(100);
  }
  console.log("Completed upsert of all seasons.");
}

if (require.main === module) {
  runUpsertAll()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
