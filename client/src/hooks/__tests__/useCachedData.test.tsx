import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCachedData } from "../useCachedData";
import { TIME } from "../../constants/constants";
import type { AxiosError } from "axios";

vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios");

  return {
    ...actual,
    isAxiosError: (error: unknown): error is AxiosError => {
      return (
        typeof error === "object" && error !== null && "isAxiosError" in error
      );
    },
  };
});
const mockNow = 1700000000000;

describe("useCachedData", () => {
  const cacheKey = "testKey";
  const ttlKey = `${cacheKey}_TTL`;
  const mockData = { message: "hello" };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("fetches and caches data when no cache exists", async () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useCachedData(cacheKey, fetchFn));

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await vi.runAllTicks();
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(fetchFn).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(localStorage.getItem(cacheKey)).toEqual(JSON.stringify(mockData));
    expect(localStorage.getItem(ttlKey)).toEqual(
      String(mockNow + TIME.ONE_DAY)
    );
  });

  it("uses cached data if TTL is valid", async () => {
    localStorage.setItem(cacheKey, JSON.stringify(mockData));
    localStorage.setItem(ttlKey, String(mockNow + 10000));

    const fetchFn = vi.fn();

    const { result } = renderHook(() => useCachedData(cacheKey, fetchFn));

    await act(async () => {
      await vi.runAllTicks();
    });

    expect(fetchFn).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("refetches data if TTL expired", async () => {
    localStorage.setItem(cacheKey, JSON.stringify({ old: true }));
    localStorage.setItem(ttlKey, String(mockNow - 1000));

    const fetchFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useCachedData(cacheKey, fetchFn));

    await act(async () => {
      await vi.runAllTicks();
    });

    expect(fetchFn).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
  });

  it("handles axios error correctly", async () => {
    const fetchFn = vi.fn().mockRejectedValue({
      isAxiosError: true,
      message: "Network Error",
      response: {
        data: {
          errors: [{ message: "Backend error" }],
        },
      },
    });

    const { result } = renderHook(() => useCachedData(cacheKey, fetchFn));

    await act(async () => {
      await vi.runAllTicks();
    });

    expect(result.current.errorMessage).toBe("Backend error");
    expect(result.current.data).toBeNull();
  });

  it("handles unexpected error correctly", async () => {
    const fetchFn = vi
      .fn()
      .mockRejectedValue(new Error("Something went wrong"));

    const { result } = renderHook(() => useCachedData(cacheKey, fetchFn));

    await act(async () => {
      await vi.runAllTicks();
    });

    expect(result.current.errorMessage).toBe("Unexpected error occurred.");
    expect(result.current.data).toBeNull();
  });
});
