import { refreshSeasonsData } from "../RefreshService";
import prisma from "../../config/db";
import getRedis from "../../config/redis";
import { mapToWorldChampion } from "../WorldChampionService";
import { mapToRaceChampions } from "../RaceChampionService";
import { retry } from "../../utils/time/retry";
import { delay } from "../../utils/time/delay";
import { REFRESH_SOURCES } from "../../constants/constants";

jest.mock("../../config/db", () => ({
  worldChampion: {
    findMany: jest.fn(),
    upsert: jest.fn(),
  },
  raceChampion: {
    deleteMany: jest.fn(),
    createMany: jest.fn(),
  },
}));

jest.mock("../../config/redis");
jest.mock("../WorldChampionService");
jest.mock("../RaceChampionService");
jest.mock("../../utils/time/retry");
jest.mock("../../utils/time/delay");

describe("refreshSeasonsData", () => {
  const mockRedis = {
    del: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (getRedis as jest.Mock).mockImplementation(() => mockRedis);

    (prisma.worldChampion.findMany as jest.Mock).mockResolvedValue([
      { season: 2022 },
    ]);

    (retry as jest.Mock).mockImplementation((_fn) =>
      Promise.resolve({ mock: "response" })
    );

    (mapToWorldChampion as jest.Mock).mockReturnValue({
      season: 2022,
      driverId: "leclerc",
      name: "Charles",
      familyName: "Leclerc",
      points: 360,
      team: "Ferrari",
    });

    (mapToRaceChampions as jest.Mock).mockReturnValue([
      {
        season: 2022,
        race: "Bahrain GP",
        driverId: "leclerc",
        isWorldChampion: true,
      },
    ]);

    (prisma.worldChampion.upsert as jest.Mock).mockResolvedValue({});
    (prisma.raceChampion.deleteMany as jest.Mock).mockResolvedValue({});
    (prisma.raceChampion.createMany as jest.Mock).mockResolvedValue({});
    (delay as jest.Mock).mockResolvedValue(undefined);
  });

  it("refreshes data for each season and updates Redis", async () => {
    await refreshSeasonsData(REFRESH_SOURCES.DEPLOY);

    expect(prisma.worldChampion.findMany).toHaveBeenCalled();
    expect(prisma.worldChampion.upsert).toHaveBeenCalled();
    expect(prisma.raceChampion.deleteMany).toHaveBeenCalledWith({
      where: { season: 2022 },
    });
    expect(prisma.raceChampion.createMany).toHaveBeenCalled();

    expect(retry).toHaveBeenCalledWith(expect.any(Function), 5, 500);
    expect(mapToWorldChampion).toHaveBeenCalled();
    expect(mapToRaceChampions).toHaveBeenCalledWith(
      expect.anything(),
      "leclerc"
    );

    expect(mockRedis.del).toHaveBeenCalledWith("seasons");
    expect(mockRedis.del).toHaveBeenCalledWith("winners:2022");

    expect(mockRedis.set).toHaveBeenCalledWith(
      "lastRefreshedAt",
      expect.any(String)
    );
    expect(mockRedis.set).toHaveBeenCalledWith(
      "lastRefreshSource",
      REFRESH_SOURCES.DEPLOY
    );

    expect(delay).toHaveBeenCalledWith(500);
  });
});
