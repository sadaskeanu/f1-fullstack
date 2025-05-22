import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";

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

  try {
    const winners = await prisma.raceChampion.findMany({
      where: { season: year },
      orderBy: { race: "asc" },
    });
    res.json(winners);
  } catch (err) {
    next(err);
  }
}
