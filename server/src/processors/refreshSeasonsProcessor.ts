import { refreshSeasonsQueue } from "../jobs/queues/refreshSeasonsQueue";
import { refreshSeasonsData } from "../services/RefreshService";

/**
 * Registers a processor for the refreshSeasonsQueue.
 * - Always runs refreshSeasonsData when scheduled.
 */
refreshSeasonsQueue.process(async () => {
  console.log("Running scheduled refresh job");
  await refreshSeasonsData("cron");
});
