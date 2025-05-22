import prisma from "../../config/db";
import { RaceChampionData } from "../../types/RaceChampionTypes";
import { fetchRaceChampions, mapToRaceChampions } from "../RaceChampionService";

export async function upsertRaceChampions(
  season: number
): Promise<RaceChampionData[]> {
  const response = await fetchRaceChampions(season);

  const worldChamp = await prisma.worldChampion.findUnique({
    where: { season },
    select: { driverId: true },
  });

  const championId = worldChamp?.driverId ?? null;

  const raceChampionsData = mapToRaceChampions(response, championId);

  const raceChampions = await Promise.all(
    raceChampionsData.map((data) =>
      prisma.raceChampion.upsert({
        where: { season_race: { season: data.season, race: data.race } },
        update: data,
        create: data,
      })
    )
  );

  return raceChampions;
}
