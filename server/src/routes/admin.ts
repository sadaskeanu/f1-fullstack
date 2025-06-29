import express from "express";
import { refreshSeasonsQueue } from "../jobs/queues/refreshSeasonsQueue";

const router = express.Router();

router.post("/trigger-manual-refresh", async (req, res) => {
  try {
    await refreshSeasonsQueue.add(
      {},
      { jobId: "manual-test", timeout: 300000 }
    );
    res.json({ status: "Manual refresh job triggered" });
  } catch (err) {
    console.error("Failed to add manual job:", err);
    res.status(500).json({ error: "Failed to queue job" });
  }
});

export default router;
