import { getSeasons } from "../seasonsController";
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

describe("seasonsController.getSeasons", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("responds with a list of seasons on success", async () => {
    const fakeSeasons = [
      {
        season: 2020,
        driverId: "hamilton",
        name: "Lewis",
        familyName: "Hamilton",
        points: 347,
        team: "Mercedes",
      },
    ];

    mockGet.mockResolvedValueOnce(null);
    jest
      .spyOn(prisma.worldChampion, "findMany")
      .mockResolvedValue(fakeSeasons as any);

    const req = {} as any;
    const json = jest.fn();
    const res = { json } as any;
    const next = jest.fn();

    await getSeasons(req, res, next);

    expect(prisma.worldChampion.findMany).toHaveBeenCalledWith({
      orderBy: { season: "asc" },
    });
    expect(mockSet).toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith(fakeSeasons);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards errors to next()", async () => {
    const error = new Error("DB failure");
    mockGet.mockResolvedValueOnce(null);
    jest.spyOn(prisma.worldChampion, "findMany").mockRejectedValue(error);

    const req = {} as any;
    const res = {} as any;
    const next = jest.fn();

    await getSeasons(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("returns cached data if available", async () => {
    const cachedData = JSON.stringify([{ season: 2022, team: "Red Bull" }]);

    mockGet.mockResolvedValueOnce(cachedData);

    const req = {} as any;
    const json = jest.fn();
    const res = { json } as any;
    const next = jest.fn();

    await getSeasons(req, res, next);

    expect(json).toHaveBeenCalledWith(JSON.parse(cachedData));
    expect(mockSet).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
