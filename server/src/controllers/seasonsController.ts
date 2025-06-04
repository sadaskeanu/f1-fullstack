import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import getRedis from "../config/redis";
import { SECONDS, CACHE_KEYS } from "../constants/constants";

/**
 * Returns a list of all world champion seasons.
 * - Checks Redis cache first; returns cached data if available.
 * - If not cached, queries the database and stores result in Redis.
 * - Cache is set to expire at the next Sunday 00:00.
 */

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

    /**
     * Sets cache till the closest Sunday.
     * If today is Sunday - cache dies in a week
     */
    const daysTillSunday = 7 - new Date().getDay();

    await redis.set(
      CACHE_KEYS.SEASONS,
      JSON.stringify(seasons),
      "EX",
      (daysTillSunday || 7) * SECONDS.ONE_DAY
    );

    res.json(seasons);
  } catch (err) {
    console.error("getSeasons error:", err);
    next(err);
  }
}
