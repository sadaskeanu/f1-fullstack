import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import prisma from "./config/db";
import seasonsRoutes from "./routes/seasonsRoutes";
import winnersRoutes from "./routes/winnersRoutes";

export const app = express();

app.use(cors());
app.use(express.json());

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
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
