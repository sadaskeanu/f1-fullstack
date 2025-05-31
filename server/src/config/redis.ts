import Redis from "ioredis";

let redis: Redis;

export default function getRedis(): Redis {
  if (!redis) {
    const url = process.env.REDIS_URL;
    if (url) {
      console.log("Connecting to Redis with dual-stack DNS...");
      redis = new Redis(`${url}?family=0`);
    } else {
      console.log("Connecting to local Redis...");
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
