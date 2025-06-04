/**
 * Fetches a URL with a timeout mechanism.
 * - Aborts the request if it exceeds the specified duration.
 * - Throws a custom error if the request times out.
 */

export async function fetchWithTimeout(url: string, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return response;
  } catch (err) {
    clearTimeout(timeout);
    if ((err as Error).name === "AbortError") {
      throw new Error("Request to Server API timed out");
    }
    throw err;
  }
}
