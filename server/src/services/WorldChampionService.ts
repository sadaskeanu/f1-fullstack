import type {
  WorldChampionResponse,
  WorldChampionData,
} from "../models/WorldChampionModel";

export async function fetchWorldChampion(
  season: number
): Promise<WorldChampionResponse> {
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
  return (await response.json()) as WorldChampionResponse;
}

export function mapToWorldChampion(
  raw: WorldChampionResponse
): WorldChampionData {
  const list = raw.MRData.StandingsTable.StandingsLists[0];
  const standing = list.DriverStandings[0];
  return {
    season: Number(list.season),
    driverId: standing.Driver.driverId,
    name: standing.Driver.givenName,
    familyName: standing.Driver.familyName,
    points: Number(standing.points),
    team: standing.Constructors[0].name,
  };
}
