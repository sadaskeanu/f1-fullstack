import { runUpsertAll } from "../upsertAllChampionsAndRaces";
import * as worldRepo from "../../repositories/worldChampionRepo";
import * as raceRepo from "../../repositories/raceChampionRepo";
import * as delayUtils from "../../utils/time/delay";
import * as retryUtils from "../../utils/time/retry";
import prisma from "../../config/db";

jest.mock("../../config/db", () => ({
  worldChampion: {
    findMany: jest.fn(),
  },
  raceChampion: {
    groupBy: jest.fn(),
  },
}));

describe("runUpsertAll", () => {
  const originalLog = console.log;
  const originalError = console.error;
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    jest.clearAllMocks();

    jest.spyOn(delayUtils, "delay").mockResolvedValue(undefined);
    jest.spyOn(retryUtils, "retry").mockImplementation((fn) => fn());

    jest.spyOn(worldRepo, "upsertWorldChampion").mockResolvedValue({
      driverId: "test-driver",
    } as any);

    jest.spyOn(raceRepo, "upsertRaceChampions").mockResolvedValue([]);

    (prisma.worldChampion.findMany as jest.Mock).mockResolvedValue(
      Array.from({ length: currentYear - 2005 }, (_, i) => ({
        season: 2005 + i,
      }))
    );

    (prisma.raceChampion.groupBy as jest.Mock).mockResolvedValue(
      Array.from({ length: currentYear - 2005 }, (_, i) => ({
        season: 2005 + i,
        _count: 1,
      }))
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    console.log = originalLog;
    console.error = originalError;
  });

  it("only upserts current year if all previous years have complete data", async () => {
    await runUpsertAll();

    expect(worldRepo.upsertWorldChampion).toHaveBeenCalledTimes(1);
    expect(raceRepo.upsertRaceChampions).toHaveBeenCalledTimes(1);
    expect(worldRepo.upsertWorldChampion).toHaveBeenCalledWith(currentYear);
    expect((console.log as jest.Mock).mock.calls.flat()).toContain(
      "🎉 Completed upsert of all required seasons."
    );
  });
});
