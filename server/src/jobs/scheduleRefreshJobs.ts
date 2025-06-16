import { refreshSeasonsQueue } from "./queues/refreshSeasonsQueue";
import { SCHEDULING } from "../constants/constants";

/**
 * Schedules a background job to refresh season data weekly.
 * - Ensures Redis queue is ready before scheduling.
 * - Checks if the weekly job is already scheduled (via cron).
 * - If not, schedules it using a repeatable cron expression.
 * - Optionally triggers a one-time manual refresh on deploy (via .env flag).
 */

export async function scheduleRefreshJobs() {
  console.log("Waiting for Redis queue to be ready...");
  await refreshSeasonsQueue.isReady();
  console.log("Redis queue is ready");

  let retry = 0;
  while (retry < SCHEDULING.MAX_SCHEDULE_RETRIES) {
    try {
      const jobs = await refreshSeasonsQueue.getRepeatableJobs();
      const alreadyScheduled = jobs.find(
        (j) => j.cron === SCHEDULING.WEEKLY_REFRESH_CRON
      );

      if (!alreadyScheduled) {
        await refreshSeasonsQueue.add(
          {},
          {
            repeat: { cron: SCHEDULING.WEEKLY_REFRESH_CRON },
          }
        );
        console.log("✅ Scheduled weekly refresh job");
      } else {
        console.log("ℹ️ Weekly refresh job already scheduled");
      }

      await refreshSeasonsQueue.removeJobs("manual-deploy-refresh");

      const shouldRefreshOnDeploy = process.env.REFRESH_ON_DEPLOY === "true";
      if (shouldRefreshOnDeploy) {
        await refreshSeasonsQueue.add({}, { jobId: "manual-deploy-refresh" });
        console.log(
          "🚀 One-time refresh triggered due to REFRESH_ON_DEPLOY=true"
        );
      }

      break;
    } catch (err) {
      retry++;
      console.error(
        `❌ Failed to schedule job. Retry ${retry}/${SCHEDULING.MAX_SCHEDULE_RETRIES}`,
        err
      );
      await new Promise((res) =>
        setTimeout(res, SCHEDULING.SCHEDULE_RETRY_DELAY_MS)
      );
    }
  }
}
