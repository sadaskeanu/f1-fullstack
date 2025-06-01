import Queue from "bull";
import { refreshSeasonsData } from "../../services/RefreshService";
import { parse } from "url";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined in environment variables");
}

const parsed = parse(redisUrl);
const [_, password] = parsed.auth?.split(":") ?? [];

export const refreshSeasonsQueue = new Queue("refresh-seasons", {
  redis: {
    host: parsed.hostname || "localhost",
    port: Number(parsed.port) || 6379,
    password: password || undefined,
    family: 0,
  },
});

refreshSeasonsQueue.on("error", (err) => {
  console.error("Bull queue error:", err);
});

refreshSeasonsQueue.process(async () => {
  console.log("Running scheduled refreshSeasonsData job");
  await refreshSeasonsData();
});
