import { app } from "./app";
import { scheduleRefreshJobs } from "./jobs/scheduleRefreshJobs";

const port = process.env.PORT ?? 4000;

async function startServer() {
  try {
    await scheduleRefreshJobs();
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

startServer();
