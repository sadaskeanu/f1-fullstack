import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import getRedis from "../config/redis";
import { SECONDS, CACHE_KEYS } from "../constants/constants";

/**
 * Returns race winners for a given season (year).
 * - Validates the `year` param.
 * - Checks Redis cache first; returns cached data if available.
 * - On cache miss, queries the database and stores the result in Redis.
 * - Cache is set to expire at the next Sunday 00:00.
 */

export async function getWinners(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const year = Number(req.params.year);
  if (isNaN(year)) {
    res.status(400).json({ error: "Invalid year parameter" });
    return;
  }

  const cacheKey = `${CACHE_KEYS.WINNERS_PREFIX}${year}`;

  try {
    const redis = getRedis();
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`→ Redis cache hit for ${cacheKey}`);
      res.json(JSON.parse(cached));
      return;
    }

    console.log(`→ Redis cache miss for ${cacheKey}: saving to Redis`);

    const winners = await prisma.raceChampion.findMany({
      where: { season: year },
      orderBy: { race: "asc" },
    });

    /**
     * Sets cache till the closest Sunday.
     * If today is Sunday - cache dies in a week
     */
    const daysTillSunday = 7 - new Date().getDay();
    await redis.set(
      cacheKey,
      JSON.stringify(winners),
      "EX",
      (daysTillSunday || 7) * SECONDS.ONE_DAY
    );

    res.json(winners);
  } catch (err) {
    console.error("getWinners error:", err);
    next(err);
  }
}
