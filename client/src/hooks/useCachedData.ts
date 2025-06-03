import { useEffect, useState } from "react";
import { TIME } from "../constants/constants";

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
        setErrorMessage(err?.message || "Failed to fetch data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cacheKey, fetchFn, ttlMs]);

  return { data, isLoading, errorMessage };
}
