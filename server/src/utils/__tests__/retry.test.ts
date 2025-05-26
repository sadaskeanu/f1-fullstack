import { retry } from "../retry";
import { delay } from "../delay";

jest.mock("../delay", () => ({
  delay: jest.fn(() => Promise.resolve()), // instantly resolves delay
}));

describe("retry()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("resolves immediately if function succeeds on first try", async () => {
    const fn = jest.fn().mockResolvedValue("OK");
    const result = await retry(fn);
    expect(result).toBe("OK");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on 429 error and eventually succeeds", async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("429 Too Many Requests"))
      .mockResolvedValueOnce("Success after retry");

    const result = await retry(fn, 3, 1000);

    expect(result).toBe("Success after retry");
    expect(fn).toHaveBeenCalledTimes(2);
    expect(delay).toHaveBeenCalledWith(1000);
  });

  it("does not retry on non-rate-limit error", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("Database error"));

    await expect(retry(fn)).rejects.toThrow("Database error");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("fails after max retries if rate-limited every time", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("429 Too Many Requests"));

    await expect(retry(fn, 3, 1000)).rejects.toThrow("Failed after 3 retries.");
    expect(fn).toHaveBeenCalledTimes(3);
    expect(delay).toHaveBeenCalledTimes(2); // no delay on last failed attempt
  });
});
