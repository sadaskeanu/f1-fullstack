import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import getRedis from "../config/redis";

export async function getSeasons(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const redis = getRedis();
    const cached = await redis.get("seasons");
    if (cached) {
      res.json(JSON.parse(cached));
      return;
    }

    const seasons = await prisma.worldChampion.findMany({
      orderBy: { season: "asc" },
    });

    const oneWeekInSeconds = 60 * 60 * 24 * 7;

    await redis.set("seasons", JSON.stringify(seasons), "EX", oneWeekInSeconds);

    res.json(seasons);
  } catch (err) {
    console.error("getSeasons error:", err);
    next(err);
  }
}
