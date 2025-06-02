import Queue from "bull";
import { URL } from "url";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined in environment variables");
}

const parsed = new URL(redisUrl);

export const refreshSeasonsQueue = new Queue("refresh-seasons", {
  redis: {
    host: parsed.hostname || "localhost",
    port: Number(parsed.port) || 6379,
    password: parsed.password || undefined,
    family: 0,
  },
});

refreshSeasonsQueue.on("error", (err) => {
  console.error("Bull queue error:", err);
});
