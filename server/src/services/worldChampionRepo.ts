import prisma from "../config/db";
import type { WorldChampion } from "@prisma/client";
import { fetchWorldChampion, mapToWorldChampion } from "./ergastService";

export async function upsertWorldChampion(
  season: number
): Promise<WorldChampion> {
  const raw = await fetchWorldChampion(season);

  const data = mapToWorldChampion(raw);

  return prisma.worldChampion.upsert({
    where: { season: data.season },
    update: {
      driverId: data.driverId,
      name: data.name,
      familyName: data.familyName,
      points: data.points,
      team: data.team,
    },
    create: data,
  });
}
