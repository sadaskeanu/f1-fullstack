import { upsertWorldChampion } from "../worldChampionRepo";
import {
  fetchWorldChampion,
  mapToWorldChampion,
} from "../../services/WorldChampionService";
import prisma from "../../config/db";

jest.mock("../../services/WorldChampionService");
jest.mock("../../config/db", () => ({
  worldChampion: { upsert: jest.fn() },
}));

describe("upsertWorldChampion", () => {
  const mockFetchWorldChampion = fetchWorldChampion as jest.Mock;
  const mockMapToWorldChampion = mapToWorldChampion as jest.Mock;
  const mockUpsert = prisma.worldChampion.upsert as jest.Mock;

  const mockSeason = 2024;
  const apiResponse = { some: "rawApiResponse" };
  const mappedChampion = {
    season: mockSeason,
    driverId: "max_verstappen",
    name: "Max",
    familyName: "Verstappen",
    points: 420,
    team: "Red Bull Racing",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch, map, and upsert the world champion", async () => {
    mockFetchWorldChampion.mockResolvedValue(apiResponse);
    mockMapToWorldChampion.mockReturnValue(mappedChampion);
    mockUpsert.mockResolvedValue(mappedChampion);

    const result = await upsertWorldChampion(mockSeason);

    expect(mockFetchWorldChampion).toHaveBeenCalledWith(mockSeason);
    expect(mockMapToWorldChampion).toHaveBeenCalledWith(apiResponse);

    expect(mockUpsert).toHaveBeenCalledWith({
      where: { season: mockSeason },
      update: {
        driverId: mappedChampion.driverId,
        name: mappedChampion.name,
        familyName: mappedChampion.familyName,
        points: mappedChampion.points,
        team: mappedChampion.team,
      },
      create: mappedChampion,
    });

    expect(result).toEqual(mappedChampion);
  });
});
