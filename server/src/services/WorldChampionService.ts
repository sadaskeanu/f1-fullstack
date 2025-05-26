import type {
  WorldChampionResponse,
  WorldChampionData,
} from "../models/WorldChampionModel";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export async function fetchWorldChampion(
  season: number
): Promise<WorldChampionResponse> {
  const base = process.env.ERGAST_API_BASE;
  if (!base) throw new Error("Missing ERGAST_API_BASE environment variable");

  const url = `${base}f1/${season}/driverStandings/1.json`;

  try {
    const response = await fetchWithTimeout(url, 5000);

    if (!response.ok) {
      throw new Error(
        `Server API responded with ${response.status}: ${response.statusText}`
      );
    }

    const json = await response.json();

    const standings = json?.MRData?.StandingsTable?.StandingsLists;
    if (!standings || standings.length === 0) {
      throw new Error(`No world champion data found for season ${season}`);
    }

    return json;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to fetch world champion for season ${season}: ${message}`
    );
  }
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
