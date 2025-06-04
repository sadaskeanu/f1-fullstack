import Redis from "ioredis";

let redis: Redis;

/**
 * Returns a Redis client instance.
 * - If REDIS_URL is set (e.g. Railway), use it with IPv6 support.
 * - Otherwise, fall back to REDIS_HOST and REDIS_PORT (for local dev).
 * - Logs any Redis connection errors.
 */

export default function getRedis(): Redis {
  if (process.env.REDIS_URL) {
    console.log("Connecting to Redis using REDIS_URL");
    const url = process.env.REDIS_URL + "?family=0";
    redis = new Redis(url);
  } else {
    console.log("Connecting to Redis using REDIS_HOST and REDIS_PORT fallback");
    redis = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    });

    redis.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  }

  return redis;
}
