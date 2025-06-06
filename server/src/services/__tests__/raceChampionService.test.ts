import nock from "nock";
import { fetchRaceChampions, mapToRaceChampions } from "../RaceChampionService";
import type { RaceResponse } from "../../models/RaceChampionModel";

describe("RaceChampionService", () => {
  const season = 2024;
  const base = "https://api.jolpi.ca/ergast/";

  beforeAll(() => {
    process.env.ERGAST_API_BASE = base;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("fetchRaceChampions() throws on bad status", async () => {
    nock(base).get(`/f1/${season}/results/1.json`).reply(500);

    await expect(fetchRaceChampions(season)).rejects.toThrow(
      "Server API error"
    );
  });

  it("fetchRaceChampions() throws on empty races", async () => {
    nock(base)
      .get(`/f1/${season}/results/1.json`)
      .reply(200, {
        MRData: {
          RaceTable: {
            season: `${season}`,
            Races: [],
          },
        },
      });

    await expect(fetchRaceChampions(season)).rejects.toThrow(
      `No race results found for season ${season}`
    );
  });

  it("mapToRaceChampions() maps correctly with champion flag", () => {
    const fakeApi: RaceResponse = {
      MRData: {
        RaceTable: {
          season: "2024",
          Races: [
            {
              season: "2024",
              round: "1",
              raceName: "Australia Grand Prix",
              Results: [
                {
                  Driver: {
                    driverId: "hamilton",
                    givenName: "Lewis",
                    familyName: "Hamilton",
                  },
                  Constructor: {
                    name: "Mercedes",
                  },
                },
              ],
            },
            {
              season: "2024",
              round: "2",
              raceName: "Bahrain Grand Prix",
              Results: [
                {
                  Driver: {
                    driverId: "verstappen",
                    givenName: "Max",
                    familyName: "Verstappen",
                  },
                  Constructor: {
                    name: "Red Bull",
                  },
                },
              ],
            },
          ],
        },
      },
    };

    const mapped = mapToRaceChampions(fakeApi, "hamilton");

    expect(mapped).toEqual([
      {
        season: 2024,
        race: "Australia Grand Prix",
        driverId: "hamilton",
        driverName: "Lewis",
        driverFamilyName: "Hamilton",
        team: "Mercedes",
        isWorldChampion: true,
      },
      {
        season: 2024,
        race: "Bahrain Grand Prix",
        driverId: "verstappen",
        driverName: "Max",
        driverFamilyName: "Verstappen",
        team: "Red Bull",
        isWorldChampion: false,
      },
    ]);
  });
});
