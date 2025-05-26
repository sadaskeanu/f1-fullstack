import { describe, it, expect, vi, beforeEach } from "vitest";
import { getWorldChampions, getRaceChampions, apiClient } from "../api";
import type { WorldChampion } from "../../types/WorldChampionData";
import type { RaceWinner } from "../../types/RaceChampionsData";

describe("API fetch functions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getWorldChampions fetches and returns world champions", async () => {
    const mockData: WorldChampion[] = [
      {
        id: 1,
        season: 2023,
        driverId: "max_verstappen",
        name: "Max",
        familyName: "Verstappen",
        points: 575,
        team: "Red Bull Racing",
      },
    ];

    const getMock = vi
      .spyOn(apiClient, "get")
      .mockResolvedValueOnce({ data: mockData });

    const result = await getWorldChampions();

    expect(getMock).toHaveBeenCalledWith("/seasons");
    expect(result).toEqual(mockData);
  });

  it("getRaceChampions fetches and returns race champions for a year", async () => {
    const mockData: RaceWinner[] = [
      {
        id: 101,
        season: 2023,
        race: "Bahrain Grand Prix",
        driverId: "max_verstappen",
        driverName: "Max",
        driverFamilyName: "Verstappen",
        team: "Red Bull Racing",
        isWorldChampion: true,
      },
    ];

    const getMock = vi
      .spyOn(apiClient, "get")
      .mockResolvedValueOnce({ data: mockData });

    const result = await getRaceChampions(2023);

    expect(getMock).toHaveBeenCalledWith("/2023/winners");
    expect(result).toEqual(mockData);
  });
});
