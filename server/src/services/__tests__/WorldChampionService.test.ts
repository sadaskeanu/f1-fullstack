import nock from "nock";
import {
  fetchWorldChampion,
  mapToWorldChampion,
} from "../WorldChampionService";

describe("ErgastService", () => {
  const season = 2024;
  const base = "https://api.jolpi.ca/ergast/";

  beforeAll(() => {
    process.env.ERGAST_API_BASE = base;
  });

  afterEach(() => nock.cleanAll());

  it("fetchWorldChampion() throws on bad status", async () => {
    nock(base).get(`/f1/${season}/driverStandings/1.json`).reply(500);

    await expect(fetchWorldChampion(season)).rejects.toThrow(
      "Server API responded with 500"
    );
  });

  it("fetchWorldChampion() throws on empty standings list", async () => {
    nock(base)
      .get(`/f1/${season}/driverStandings/1.json`)
      .reply(200, {
        MRData: {
          StandingsTable: {
            StandingsLists: [],
          },
        },
      });

    await expect(fetchWorldChampion(season)).rejects.toThrow(
      `No world champion data found for season ${season}`
    );
  });

  it("mapToWorldChampion() maps correctly", () => {
    const fakeApi = {
      MRData: {
        StandingsTable: {
          StandingsLists: [
            {
              season: "2024",
              DriverStandings: [
                {
                  Driver: {
                    driverId: "hamilton",
                    givenName: "Lewis",
                    familyName: "Hamilton",
                  },
                  Constructors: [{ name: "Mercedes" }],
                  points: "387",
                },
              ],
            },
          ],
        },
      },
    };
    const mapped = mapToWorldChampion(fakeApi as any);
    expect(mapped).toEqual({
      season: 2024,
      driverId: "hamilton",
      name: "Lewis",
      familyName: "Hamilton",
      points: 387,
      team: "Mercedes",
    });
  });
});
