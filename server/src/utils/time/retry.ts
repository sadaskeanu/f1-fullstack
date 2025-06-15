import { delay } from "./delay";

/**
 * Retries an asynchronous function with optional delay and backoff.
 * - Attempts the function up to `maxRetries` times.
 * - If a rate limit error (e.g. 429) is detected, waits longer before retrying.
 * - Uses exponential backoff for rate-limiting, capped at 5 seconds.
 * - Throws a final error if all attempts fail.
 */

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
        err.message?.includes("429") ||
        err.message?.includes("Too Many Requests");

      const isLastAttempt = attempt === maxRetries;

      const wait = isRateLimit ? Math.min(baseDelay * attempt, 5000) : 500;

      if (!isLastAttempt) {
        console.warn(
          `⚠️ Failed fetch — retrying (attempt ${attempt}/${maxRetries}) in ${wait}ms: ${err.message}`
        );
        await delay(wait);
      } else {
        throw new Error(
          `Failed after ${maxRetries} retries. Last error: ${err.message}`
        );
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} retries.`);
}
