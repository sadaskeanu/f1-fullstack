import { getWinners } from "../winnersController";
import prisma from "../../config/db";

const mockGet = jest.fn();
const mockSet = jest.fn();

jest.mock("../../config/redis", () => ({
  __esModule: true,
  default: () => ({
    get: mockGet,
    set: mockSet,
    on: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
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

    mockGet.mockResolvedValueOnce(null);
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
    expect(mockSet).toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith(fakeWinners);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards errors to next()", async () => {
    const error = new Error("DB failure");
    mockGet.mockResolvedValueOnce(null); // no cache
    jest.spyOn(prisma.raceChampion, "findMany").mockRejectedValue(error);

    const req = { params: { year: "2022" } } as any;
    const res = {} as any;
    const next = jest.fn();

    await getWinners(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("returns cached data if available", async () => {
    const cachedData = JSON.stringify([
      {
        season: 2022,
        race: "Cached GP",
        driverId: "cached",
        driverName: "Cache",
        driverFamilyName: "Driver",
        team: "CacheTeam",
        isWorldChampion: false,
      },
    ]);

    mockGet.mockResolvedValueOnce(cachedData);

    const req = { params: { year: "2022" } } as any;
    const json = jest.fn();
    const res = { json } as any;
    const next = jest.fn();

    await getWinners(req, res, next);

    expect(json).toHaveBeenCalledWith(JSON.parse(cachedData));
    expect(mockSet).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
