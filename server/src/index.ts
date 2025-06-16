import { app } from "./app";
import { scheduleRefreshJobs } from "./jobs/scheduleRefreshJobs";
import "./processors/refreshSeasonsProcessor";

const port = process.env.PORT ?? 4000;

async function startServer() {
  try {
    console.log("Starting server setup...");

    console.log("Scheduling refresh jobs...");
    await scheduleRefreshJobs();
    console.log("Scheduled refresh jobs!");

    app.listen(port, () => {
      console.log(`
        🚀 Server is running!
        ➜  Local: http://localhost:${port}/api/seasons
      `);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

console.log(`REFRESH_ON_DEPLOY = ${process.env.REFRESH_ON_DEPLOY}`);

startServer();
