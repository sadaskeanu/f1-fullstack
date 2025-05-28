import { refreshSeasonsQueue } from "./queues/refreshSeasonsQueue";

export async function scheduleRefreshJobs() {
  await refreshSeasonsQueue.add({}, { repeat: { cron: "0 0 * * 0" } });
}
