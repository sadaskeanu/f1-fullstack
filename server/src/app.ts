import express from "express";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import prisma from "./config/db";
import seasonsRoutes from "./routes/seasonsRoutes";
import winnersRoutes from "./routes/winnersRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggerConfig";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { refreshSeasonsQueue } from "./jobs/queues/refreshSeasonsQueue";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("Swagger Spec loaded:", JSON.stringify(swaggerSpec, null, 2));

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullAdapter(refreshSeasonsQueue)],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.get("/test-db", async (_req, res) => {
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

app.use("/api/seasons", seasonsRoutes);
app.use("/api", winnersRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: err.message || "Unexpected server error",
  });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.errors });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
