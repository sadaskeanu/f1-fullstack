import { useEffect, useState } from "react";
import axios from "axios";
import { TIME } from "../constants/constants";

/**
 * React hook for fetching and caching data in localStorage with a time-to-live (TTL).
 *
 * - Tries to load cached data from localStorage using a key and TTL timestamp.
 * - If cached data is valid, uses it and skips the fetch.
 * - If not, calls the provided fetch function and stores the result in localStorage.
 * - Handles loading state and backend/validation errors gracefully.
 */

export function useCachedData<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  ttlMs: number = TIME.ONE_DAY
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const ttlKey = `${cacheKey}_TTL`;
    const now = Date.now();

    const cached = localStorage.getItem(cacheKey);
    const ttl = localStorage.getItem(ttlKey);

    if (cached && ttl && now < Number(ttl)) {
      setData(JSON.parse(cached));
      return;
    }

    setIsLoading(true);

    fetchFn()
      .then((result) => {
        setData(result);
        localStorage.setItem(cacheKey, JSON.stringify(result));
        localStorage.setItem(ttlKey, String(now + ttlMs));
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const backendMessage =
            err.response?.data?.errors?.[0]?.message || err.message;
          setErrorMessage(backendMessage);
        } else {
          setErrorMessage("Unexpected error occurred.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cacheKey, fetchFn, ttlMs]);

  return { data, isLoading, errorMessage };
}
