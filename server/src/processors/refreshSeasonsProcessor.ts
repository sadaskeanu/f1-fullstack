import { refreshSeasonsQueue } from "../jobs/queues/refreshSeasonsQueue";
import { refreshSeasonsData } from "../services/RefreshService";

refreshSeasonsQueue.process(async () => {
  console.log("Running scheduled refreshSeasonsData job");
  await refreshSeasonsData();
});
