/**
 * Returns a promise that resolves after a given delay.
 * Useful for throttling or adding pauses between async operations.
 */

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
