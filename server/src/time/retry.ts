import { delay } from "./delay";

export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries = 10,
  baseDelay = 2000
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;
      const isRateLimit =
        err.message.includes("429") ||
        err.message.includes("Too Many Requests");

      if (isRateLimit && attempt < maxRetries) {
        const wait = Math.min(baseDelay * attempt, 5000);
        console.log(`Rate limited, retrying in ${wait}ms...`);
        await delay(wait);
        continue;
      }

      if (isRateLimit && attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} retries.`);
      }

      throw err;
    }
  }

  throw new Error(`Failed after ${maxRetries} retries.`);
}
