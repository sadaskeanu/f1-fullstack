import Redis from "ioredis";

let redis: Redis;

export default function getRedis(): Redis {
  if (!redis) {
    const url = process.env.REDIS_PUBLIC_URL + "?family=0";
    console.log("REDIS_URL:", process.env.REDIS_PUBLIC_URL);
    if (url) {
      redis = new Redis(url);
    } else {
      console.log("🔗 Connecting to local Redis...");
      redis = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      });
    }

    redis.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  }

  return redis;
}
