import { scheduleRefreshJobs } from "../scheduleRefreshJobs";
import { refreshSeasonsQueue } from "../queues/refreshSeasonsQueue";

jest.mock("../queues/refreshSeasonsQueue", () => ({
  refreshSeasonsQueue: {
    isReady: jest.fn(),
    getRepeatableJobs: jest.fn(),
    add: jest.fn(),
  },
}));

jest.mock("../../utils/time/delay", () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

describe("scheduleRefreshJobs", () => {
  const mockIsReady = refreshSeasonsQueue.isReady as jest.Mock;
  const mockGetRepeatableJobs =
    refreshSeasonsQueue.getRepeatableJobs as jest.Mock;
  const mockAdd = refreshSeasonsQueue.add as jest.Mock;

  const consoleErrorMock = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it("retries up to 3 times on failure and then stops", async () => {
    mockIsReady.mockResolvedValue(undefined);

    const error = new Error("Queue error");
    mockGetRepeatableJobs
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockResolvedValue([]);

    mockAdd.mockResolvedValue(undefined);

    await scheduleRefreshJobs();

    expect(mockGetRepeatableJobs).toHaveBeenCalledTimes(3);
    expect(mockAdd).toHaveBeenCalledWith({}, { repeat: { cron: "0 0 * * 0" } });
  });
});
