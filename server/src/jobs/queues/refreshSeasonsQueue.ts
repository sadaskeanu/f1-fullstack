import Queue from "bull";
import { refreshSeasonsData } from "../../services/RefreshService";

export const refreshSeasonsQueue = new Queue("refresh-seasons", {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: 6379,
  },
});

refreshSeasonsQueue.process(async () => {
  console.log("Running scheduled refreshSeasonsData job");
  await refreshSeasonsData();
});
