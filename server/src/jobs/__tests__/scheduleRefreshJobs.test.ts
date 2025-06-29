import { scheduleRefreshJobs } from "../scheduleRefreshJobs";
import { refreshSeasonsQueue } from "../queues/refreshSeasonsQueue";
import { REFRESH_JOB_SCHEDULES } from "../../constants/constants";

jest.mock("../queues/refreshSeasonsQueue", () => ({
  refreshSeasonsQueue: {
    isReady: jest.fn(),
    getRepeatableJobs: jest.fn(),
    add: jest.fn(),
    removeJobs: jest.fn(),
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
  const mockRemoveJobs = refreshSeasonsQueue.removeJobs as jest.Mock;

  const consoleErrorMock = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  const consoleLogMock = jest
    .spyOn(console, "log")
    .mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REFRESH_ON_DEPLOY = "false";
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
    consoleLogMock.mockRestore();
  });

  it("retries on failure and schedules all missing jobs", async () => {
    mockIsReady.mockResolvedValue(undefined);

    const mockJobs: { id: string; cron: string }[] = [];

    const error = new Error("Queue error");

    mockGetRepeatableJobs
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockResolvedValue(mockJobs);

    mockAdd.mockResolvedValue(undefined);

    await scheduleRefreshJobs();

    expect(mockGetRepeatableJobs).toHaveBeenCalledTimes(3);
    expect(mockAdd).toHaveBeenCalledTimes(REFRESH_JOB_SCHEDULES.length);

    for (const job of REFRESH_JOB_SCHEDULES) {
      expect(mockAdd).toHaveBeenCalledWith(
        {},
        {
          repeat: { cron: job.cron },
          jobId: job.jobId,
        }
      );
    }

    expect(mockRemoveJobs).toHaveBeenCalledWith("manual-deploy-refresh");
  });

  it("adds manual-deploy-refresh job if REFRESH_ON_DEPLOY is true", async () => {
    process.env.REFRESH_ON_DEPLOY = "true";

    const mockJobs: { id: string; cron: string }[] = [];

    mockIsReady.mockResolvedValue(undefined);
    mockGetRepeatableJobs.mockResolvedValue(mockJobs);
    mockAdd.mockResolvedValue(undefined);

    await scheduleRefreshJobs();

    expect(mockAdd).toHaveBeenCalledWith(
      {},
      { jobId: "manual-deploy-refresh" }
    );
  });
});
