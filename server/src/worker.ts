import { refreshSeasonsQueue } from "./jobs/queues/refreshSeasonsQueue";
import { refreshSeasonsData } from "./services/RefreshService";

/**
 * This file registers the Bull job processor for scheduled background tasks.
 * It runs independently from the main Express app.
 * Used by the `worker` container in docker-compose to process jobs like `refresh-seasons`.
 */

async function startWorker() {
  console.log("🚀 Worker starting...");

  try {
    await refreshSeasonsQueue.isReady();
    console.log("Connected to Redis, queue is ready");

    refreshSeasonsQueue.process("*", 300000, async (job) => {
      console.log(`Job ${job.id} started at ${new Date().toISOString()}`);

      try {
        await refreshSeasonsData("cron");
        console.log(`refreshSeasonsData completed for job ${job.id}`);
      } catch (err) {
        console.error(`refreshSeasonsData failed for job ${job.id}:`, err);
        throw err;
      }
    });

    refreshSeasonsQueue.on("completed", (job) => {
      console.log(`Job ${job.id} completed`);
    });

    refreshSeasonsQueue.on("failed", (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });
  } catch (err) {
    console.error("Worker failed to initialize:", err);
    process.exit(1);
  }
}

startWorker();
