import { RaceResponse, RaceChampionData } from "../models/RaceChampionModel";

export async function fetchRaceChampions(
  season: number
): Promise<RaceResponse> {
  const base = process.env.ERGAST_API_BASE;
  if (!base) throw new Error("Missing ERGAST_API_BASE environment variable");

  const url = `${base}f1/${season}/results/1.json`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Ergast API error: ${response.status} ${response.statusText}`
    );
  return response.json() as Promise<RaceResponse>;
}

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
