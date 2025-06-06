import { useEffect, useState } from "react";

interface CacheStore<U> {
  time: number;
  cache: U;
}

export const useCachedFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cache = localStorage.getItem(url);

      if (cache) {
        const cachedData: CacheStore<T> = JSON.parse(cache);
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        if (now - cachedData.time < fiveMinutes) {
          setData(cachedData.cache);
          return;
        }
      }

      try {
        setError("");
        setLoading(true);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        setData(responseData);

        const newCacheData = {
          time: Date.now(),
          cache: responseData,
        };

        localStorage.setItem(url, JSON.stringify(newCacheData));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
