import { getSeasons } from "../seasonsController";
import prisma from "../../config/db";

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
    expect(json).toHaveBeenCalledWith(fakeSeasons);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards errors to next()", async () => {
    const error = new Error("DB failure");
    jest.spyOn(prisma.worldChampion, "findMany").mockRejectedValue(error);

    const req = {} as any;
    const res = {} as any;
    const next = jest.fn();

    await getSeasons(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
