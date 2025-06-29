import { refreshSeasonsQueue } from "./queues/refreshSeasonsQueue";
import { REFRESH_JOB_SCHEDULES, RETRY_SETTINGS } from "../constants/constants";

/**
 * Initializes and schedules recurring background jobs for refreshing season data.
 *
 * This function:
 * - Waits for the Redis-based job queue to be ready.
 * - Schedules three weekly refresh jobs at specific times:
 *   - Sunday 22:00 (primary refresh attempt)
 *   - Monday 02:00 (retry if no update detected)
 *   - Monday 06:00 (final fallback before user traffic)
 * - Ensures jobs are not duplicated by checking existing repeatable jobs.
 * - Removes any stale one-time jobs (e.g. from deploys).
 * - Optionally triggers an immediate one-time refresh on deploy, if enabled via .env.
 *
 * The goal is to keep cached season data fresh and ensure updates are pulled from
 * the external API after each F1 race weekend, without introducing unnecessary load.
 */

export async function scheduleRefreshJobs() {
  console.log("Waiting for Redis queue to be ready...");
  await refreshSeasonsQueue.isReady();
  console.log("Redis queue is ready");

  let retry = 0;
  while (retry < RETRY_SETTINGS.MAX_RETRIES) {
    try {
      const jobs = await refreshSeasonsQueue.getRepeatableJobs();
      const alreadyScheduled = (id: string) => jobs.find((j) => j.id === id);

      for (const schedule of REFRESH_JOB_SCHEDULES) {
        if (!alreadyScheduled(schedule.jobId)) {
          await refreshSeasonsQueue.add(
            {},
            {
              repeat: { cron: schedule.cron },
              jobId: schedule.jobId,
            }
          );
          console.log(`Scheduled job: ${schedule.jobId} at ${schedule.cron}`);
        } else {
          console.log(`Job already scheduled: ${schedule.jobId}`);
        }
      }

      await refreshSeasonsQueue.removeJobs("manual-deploy-refresh");

      if (process.env.REFRESH_ON_DEPLOY === "true") {
        await refreshSeasonsQueue.add({}, { jobId: "manual-deploy-refresh" });
        console.log("One-time refresh triggered due to REFRESH_ON_DEPLOY=true");
      }

      break;
    } catch (err) {
      retry++;
      console.error(
        `Failed to schedule jobs. Retry ${retry}/${RETRY_SETTINGS.MAX_RETRIES}`,
        err
      );
      await new Promise((res) =>
        setTimeout(res, RETRY_SETTINGS.RETRY_DELAY_MS)
      );
    }
  }
}
