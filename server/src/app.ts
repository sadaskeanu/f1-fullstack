import express from "express";
import cors from "cors";
import championsRoutes from "./routes/WorldsChampions";

import prisma from "./config/db";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/test-db", async (_req, res) => {
  try {
    const [{ now }] = await prisma.$queryRaw<
      { now: Date }[]
    >`SELECT NOW() AS now`;
    res.json({ now });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection error");
  }
});

app.use("/api", championsRoutes);
