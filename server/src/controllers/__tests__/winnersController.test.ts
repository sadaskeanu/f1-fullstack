import { getWinners } from "../winnersController";
import prisma from "../../config/db";

jest.mock("../../config/redis", () => ({
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue("OK"),
}));

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("winnersController.getWinners", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns 400 if year param is not a number", async () => {
    const req = { params: { year: "not-a-number" } } as any;
    const json = jest.fn();
    const status = jest.fn().mockReturnThis();
    const res = { status, json } as any;
    const next = jest.fn();

    await getWinners(req, res, next);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ error: "Invalid year parameter" });
    expect(next).not.toHaveBeenCalled();
  });

  it("responds with race winners on success", async () => {
    const fakeWinners = [
      {
        season: 2021,
        race: "Test GP",
        driverId: "test-driver",
        driverName: "Test",
        driverFamilyName: "Driver",
        team: "TestTeam",
        isWorldChampion: false,
      },
    ];
    jest
      .spyOn(prisma.raceChampion, "findMany")
      .mockResolvedValue(fakeWinners as any);

    const req = { params: { year: "2021" } } as any;
    const json = jest.fn();
    const res = { json } as any;
    const next = jest.fn();

    await getWinners(req, res, next);

    expect(prisma.raceChampion.findMany).toHaveBeenCalledWith({
      where: { season: 2021 },
      orderBy: { race: "asc" },
    });
    expect(json).toHaveBeenCalledWith(fakeWinners);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards errors to next()", async () => {
    const error = new Error("DB failure");
    jest.spyOn(prisma.raceChampion, "findMany").mockRejectedValue(error);

    const req = { params: { year: "2022" } } as any;
    const res = {} as any;
    const next = jest.fn();

    await getWinners(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
