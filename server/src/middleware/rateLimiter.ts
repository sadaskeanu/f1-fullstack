import { Request, Response, NextFunction } from "express";
import getRedis from "../config/redis";
import { RATE_LIMIT } from "../constants/constants";
import { getRateLimitKey } from "../utils/users/getRateLimitKey";

/**
 * Express middleware for rate limiting using Redis and the token bucket algorithm.
 *
 * - Allows up to 100 requests in a short burst (bucket size = 100).
 * - Refills 2 tokens per second, so users can make 2 requests/sec consistently.
 * - Uses the API key from headers if available, or falls back to the user's IP address.
 * - Stores rate limit data in Redis, which works across server restarts and multiple instances.
 * - Returns a 429 response ("Too Many Requests") if the user runs out of tokens.
 *
 * Helps prevent abuse or overloading by controlling request rates fairly.
 */

const MAX_TOKENS = RATE_LIMIT.MAX_REQUESTS;
const REFILL_RATE = MAX_TOKENS / (RATE_LIMIT.WINDOW_MS / 1000);

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const redis = getRedis();
  const now = Date.now();
  const key = `${RATE_LIMIT.TOKEN_BUCKET_KEY_PREFIX}${getRateLimitKey(req)}`;

  try {
    const [storedTokens, storedTimestamp] = await redis.hmget(
      key,
      "tokens",
      "lastRefill"
    );

    const lastRefill = storedTimestamp ? parseInt(storedTimestamp) : now;
    const elapsedSeconds = (now - lastRefill) / 1000;

    let tokens = storedTokens ? parseFloat(storedTokens) : MAX_TOKENS;
    tokens = Math.min(MAX_TOKENS, tokens + elapsedSeconds * REFILL_RATE);

    console.log("Tokens left:", tokens);

    if (tokens < 1) {
      res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
      return;
    }

    await redis.hmset(key, {
      tokens: (tokens - 1).toFixed(3),
      lastRefill: now.toString(),
    });

    await redis.expire(key, RATE_LIMIT.REDIS_EXPIRE_SECONDS);

    next();
    return;
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
