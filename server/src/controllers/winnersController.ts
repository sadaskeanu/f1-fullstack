import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import redis from "../config/redis";
import getRedis from "../config/redis";

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

  const cacheKey = `winners:${year}`;

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

    const oneWeekInSeconds = 60 * 60 * 24 * 7;
    await redis.set(cacheKey, JSON.stringify(winners), "EX", oneWeekInSeconds);

    res.json(winners);
  } catch (err) {
    console.error("getWinners error:", err);
    next(err);
  }
}
