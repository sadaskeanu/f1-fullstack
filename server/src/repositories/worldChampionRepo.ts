import prisma from "../config/db";
import type { WorldChampion } from "@prisma/client";
import {
  fetchWorldChampion,
  mapToWorldChampion,
} from "../services/WorldChampionService";

/**
 * Fetches and upserts the world champion for a given season.
 * - Retrieves external champion data and maps it to internal format.
 * - Uses Prisma upsert to create or update the worldChampion record.
 */

export async function upsertWorldChampion(
  season: number
): Promise<WorldChampion> {
  const response = await fetchWorldChampion(season);
  const championData = mapToWorldChampion(response);

  const worldChampion = await prisma.worldChampion.upsert({
    where: { season: championData.season },
    update: {
      driverId: championData.driverId,
      name: championData.name,
      familyName: championData.familyName,
      points: championData.points,
      team: championData.team,
    },
    create: championData,
  });

  return worldChampion;
}
