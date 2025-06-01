import { refreshSeasonsQueue } from "./queues/refreshSeasonsQueue";

export async function scheduleRefreshJobs() {
  console.log("Waiting for Redis queue to be ready...");
  await refreshSeasonsQueue.isReady();
  console.log("Redis queue is ready");

  let retry = 0;
  while (retry < 3) {
    try {
      await refreshSeasonsQueue.add(
        {},
        {
          repeat: { cron: "0 0 * * 0" },
        }
      );
      console.log("Scheduled weekly refresh job");
      break;
    } catch (err) {
      retry++;
      console.error(`Failed to schedule job. Retry ${retry}/3`, err);
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}
