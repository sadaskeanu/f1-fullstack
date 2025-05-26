import { runUpsertAll } from "../upsertAllChampionsAndRaces";
import * as worldRepo from "../../repositories/worldChampionRepo";
import * as raceRepo from "../../repositories/raceChampionRepo";
import * as delayUtils from "../../utils/delay";
import * as retryUtils from "../../utils/retry";

describe("runUpsertAll", () => {
  const originalLog = console.log;
  const originalError = console.error;

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();

    jest.spyOn(delayUtils, "delay").mockResolvedValue(undefined);

    jest.spyOn(retryUtils, "retry").mockImplementation((fn) => fn());

    jest.spyOn(worldRepo, "upsertWorldChampion").mockResolvedValue({
      driverId: "test-driver",
    } as any);

    jest.spyOn(raceRepo, "upsertRaceChampions").mockResolvedValue([]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    console.log = originalLog;
    console.error = originalError;
  });

  it("calls upsert and retry for each year in range", async () => {
    const currentYear = new Date().getFullYear();
    const expectedCalls = currentYear - 2005 + 1;

    await runUpsertAll();

    expect(worldRepo.upsertWorldChampion).toHaveBeenCalledTimes(expectedCalls);
    expect(raceRepo.upsertRaceChampions).toHaveBeenCalledTimes(expectedCalls);
    expect(console.log).toHaveBeenCalledWith(
      "Completed upsert of all seasons and races."
    );
  });

  it("logs error if upsertWorldChampion fails", async () => {
    (worldRepo.upsertWorldChampion as jest.Mock).mockRejectedValueOnce(
      new Error("Boom!")
    );

    await runUpsertAll();

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Failed to upsert World Champion for 2005: Boom!")
    );
  });

  it("logs error if upsertRaceChampions fails", async () => {
    (raceRepo.upsertRaceChampions as jest.Mock).mockRejectedValueOnce(
      new Error("Kaboom!")
    );

    await runUpsertAll();

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Failed to upsert Race Winners for 2005: Kaboom!")
    );
  });
});
