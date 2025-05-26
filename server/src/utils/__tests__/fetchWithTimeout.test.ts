import { fetchWithTimeout } from "../fetchWithTimeout";

describe("fetchWithTimeout", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    global.fetch = originalFetch;
    jest.resetAllMocks();
  });

  it("resolves when fetch is fast enough", async () => {
    const mockResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
    });

    global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

    const result = await fetchWithTimeout("https://test.com", 5000);

    expect(result).toBe(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://test.com",
      expect.any(Object)
    );
  });

  it("throws timeout error if request takes too long", async () => {
    global.fetch = jest.fn((_url, options) => {
      const signal = (options as RequestInit).signal;

      return new Promise((_resolve, reject) => {
        if (signal) {
          signal.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        }
      });
    });

    const fetchPromise = fetchWithTimeout("https://test.com", 5000);

    jest.advanceTimersByTime(5000);

    await expect(fetchPromise).rejects.toThrow(
      "Request to Server API timed out"
    );
  });
});
