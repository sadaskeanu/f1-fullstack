import { refreshSeasonsQueue } from "../jobs/queues/refreshSeasonsQueue";
import { refreshSeasonsData } from "../services/RefreshService";

/**
 * Registers a processor for the refreshSeasonsQueue.
 * - Runs the refreshSeasonsData service when the job is triggered.
 * - Intended to be called on a schedule (e.g. every Sunday at 00:00).
 */

refreshSeasonsQueue.process(async () => {
  console.log("Running scheduled refreshSeasonsData job");
  await refreshSeasonsData();
});
