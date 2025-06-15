import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import prisma from "./config/db";
import seasonsRoutes from "./routes/seasonsRoutes";
import winnersRoutes from "./routes/winnersRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggerConfig";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { refreshSeasonsQueue } from "./jobs/queues/refreshSeasonsQueue";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { rateLimiter } from "./middleware/rateLimiter";

export const app = express();

app.enable("trust proxy");

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(helmet());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullAdapter(refreshSeasonsQueue)],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.get("/test-db", async (_req: Request, res: Response) => {
  try {
    const [{ now }] = await prisma.$queryRaw<
      { now: Date }[]
    >`SELECT NOW() AS now`;
    res.json({ now });
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).send("DB connection error");
  }
});

app.get("/api/test-rate-limit", rateLimiter, (req, res) => {
  res.send("✅ Request passed the rate limiter");
});

app.use("/api/seasons", seasonsRoutes);
app.use("/api", winnersRoutes);

app.use(errorHandler);
