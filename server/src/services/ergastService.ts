import type { ErgastResponse } from "./ergastTypes";
import type { Prisma } from "@prisma/client";

export type ChampionData = Prisma.WorldChampionUncheckedCreateInput;

export async function fetchWorldChampion(
  season: number
): Promise<ErgastResponse> {
  const base = process.env.ERGAST_API_BASE;
  if (!base) {
    throw new Error("Missing ERGAST_API_BASE environment variable");
  }
  const url = `${base}f1/${season}/driverStandings/1.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Ergast API error: ${response.status} ${response.statusText}`
    );
  }
  return (await response.json()) as ErgastResponse;
}

export function mapToWorldChampion(raw: ErgastResponse): ChampionData {
  const list = raw.MRData.StandingsTable.StandingsLists[0];
  const standing = list.DriverStandings[0];
  return {
    season: Number(list.season),
    driverId: standing.Driver.driverId,
    name: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
    familyName: standing.Driver.familyName,
    points: Number(standing.points),
    team: standing.Constructors[0].name,
  };
}
