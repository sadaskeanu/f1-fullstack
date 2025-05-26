import express from "express";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import prisma from "./config/db";
import seasonsRoutes from "./routes/seasonsRoutes";
import winnersRoutes from "./routes/winnersRoutes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: err.message || "Unexpected server error",
  });
});

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

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.errors });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
