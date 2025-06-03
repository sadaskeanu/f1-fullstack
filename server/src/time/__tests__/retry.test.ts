import { retry } from "../retry";
import { delay } from "../delay";

jest.mock("../delay", () => ({
  delay: jest.fn(() => Promise.resolve()),
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

  it("retries on non-429 error and eventually succeeds", async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("Some error"))
      .mockResolvedValueOnce("Recovered");

    const result = await retry(fn, 3, 1000);

    expect(result).toBe("Recovered");
    expect(fn).toHaveBeenCalledTimes(2);
    expect(delay).toHaveBeenCalledWith(500);
  });

  it("retries on generic error and fails after max retries", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("Boom"));

    await expect(retry(fn, 3, 1000)).rejects.toThrow(
      "Failed after 3 retries. Last error: Boom"
    );
    expect(fn).toHaveBeenCalledTimes(3);
    expect(delay).toHaveBeenCalledTimes(2);
  });

  it("limits delay for rate-limited errors", async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("429 Too Many Requests"))
      .mockRejectedValueOnce(new Error("429 Too Many Requests"))
      .mockResolvedValue("Done");

    await retry(fn, 5, 3000);

    expect(fn).toHaveBeenCalledTimes(3);
    expect(delay).toHaveBeenNthCalledWith(1, 3000);
    expect(delay).toHaveBeenNthCalledWith(2, 5000);
  });
});
