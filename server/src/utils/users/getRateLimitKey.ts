import { Request } from "express";

/**
 * Returns a unique rate-limiting key for the incoming request.
 *
 * - If the request includes an "x-api-key" header, it uses that for rate limiting.
 * - Otherwise, it falls back to using the client's IP address.
 *
 * This allows the rate limiter to track usage per API key when available,
 * or per IP address for anonymous/public clients.
 */

export function getRateLimitKey(req: Request): string {
  const apiKey = req.headers["x-api-key"];

  if (typeof apiKey === "string") {
    return `api-key:${apiKey}`;
  }

  return `ip:${req.ip}`;
}
