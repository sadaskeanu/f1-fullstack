import { RaceResponse, RaceChampionData } from "../models/RaceChampionModel";
import { fetchWithTimeout } from "../time/fetchWithTimeout";

/**
 * Fetches race winner data for a given F1 season from the Ergast API.
 * - Uses a timeout for network reliability.
 * - Throws descriptive errors for HTTP or data issues.
 */

export async function fetchRaceChampions(
  season: number
): Promise<RaceResponse> {
  const base = process.env.ERGAST_API_BASE;
  if (!base) throw new Error("Missing ERGAST_API_BASE environment variable");

  const url = `${base}f1/${season}/results/1.json`;

  try {
    const response = await fetchWithTimeout(url, 5000);

    if (!response.ok) {
      throw new Error(
        `Server API error: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    const races = json?.MRData?.RaceTable?.Races;
    if (!races || races.length === 0) {
      throw new Error(`No race results found for season ${season}`);
    }

    return json;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to fetch race champions for season ${season}: ${message}`
    );
  }
}

/**
 * Maps raw Ergast API response to internal RaceChampionData format.
 * - Includes race name, driver info, team, and world champion flag.
 */

export function mapToRaceChampions(
  raw: RaceResponse,
  championDriverId: string | null
): RaceChampionData[] {
  const season = Number(raw.MRData.RaceTable.season);

  return raw.MRData.RaceTable.Races.map((race) => {
    const win = race.Results[0];
    return {
      season,
      race: race.raceName,
      driverId: win.Driver.driverId,
      driverName: win.Driver.givenName,
      driverFamilyName: win.Driver.familyName,
      team: win.Constructor.name,
      isWorldChampion: championDriverId === win.Driver.driverId,
    };
  });
}
