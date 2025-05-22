import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";

export async function getSeasons(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const seasons = await prisma.worldChampion.findMany({
      orderBy: { season: "asc" },
    });
    res.json(seasons);
  } catch (err) {
    next(err);
  }
}
