import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import getRedis from "../config/redis";
import { SECONDS, CACHE_KEYS } from "../constants/constants";

export async function getSeasons(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const redis = getRedis();
    const cached = await redis.get(CACHE_KEYS.SEASONS);
    if (cached) {
      res.json(JSON.parse(cached));
      return;
    }

    const seasons = await prisma.worldChampion.findMany({
      orderBy: { season: "asc" },
    });

    await redis.set(
      CACHE_KEYS.SEASONS,
      JSON.stringify(seasons),
      "EX",
      SECONDS.ONE_WEEK
    );

    res.json(seasons);
  } catch (err) {
    console.error("getSeasons error:", err);
    next(err);
  }
}
