import { upsertRaceChampions } from "../raceChampionRepo";
import { fetchRaceChampions } from "../../services/RaceChampionService";
import { mapToRaceChampions } from "../../services/RaceChampionService";
import prisma from "../../config/db";

jest.mock("../../services/RaceChampionService");
jest.mock("../../config/db", () => ({
  worldChampion: { findUnique: jest.fn() },
  raceChampion: { upsert: jest.fn() },
}));

describe("upsertRaceChampions", () => {
  const mockFetchRaceChampions = fetchRaceChampions as jest.Mock;
  const mockMapToRaceChampions = mapToRaceChampions as jest.Mock;
  const mockFindUnique = prisma.worldChampion.findUnique as jest.Mock;
  const mockUpsert = prisma.raceChampion.upsert as jest.Mock;

  const mockSeason = 2024;
  const mockApiResponse = [{ raceName: "Monaco GP" }];
  const mappedData = [
    {
      season: 2024,
      race: "Monaco GP",
      driverId: "hamilton",
      isWorldChampion: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch race champions and upsert them into the database", async () => {
    mockFetchRaceChampions.mockResolvedValue(mockApiResponse);
    mockFindUnique.mockResolvedValue({ driverId: "hamilton" });
    mockMapToRaceChampions.mockReturnValue(mappedData);
    mockUpsert.mockResolvedValue(mappedData[0]);

    const result = await upsertRaceChampions(mockSeason);

    expect(mockFetchRaceChampions).toHaveBeenCalledWith(mockSeason);
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { season: mockSeason },
      select: { driverId: true },
    });
    expect(mockMapToRaceChampions).toHaveBeenCalledWith(
      mockApiResponse,
      "hamilton"
    );
    expect(mockUpsert).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mappedData[0]]);
  });

  it("should handle case where no world champion is found", async () => {
    mockFetchRaceChampions.mockResolvedValue(mockApiResponse);
    mockFindUnique.mockResolvedValue(null);
    mockMapToRaceChampions.mockReturnValue(mappedData);
    mockUpsert.mockResolvedValue(mappedData[0]);

    const result = await upsertRaceChampions(mockSeason);

    expect(mockMapToRaceChampions).toHaveBeenCalledWith(mockApiResponse, null);
    expect(result).toEqual([mappedData[0]]);
  });
});
