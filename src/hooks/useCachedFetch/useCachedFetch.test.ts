import { renderHook, act } from '@testing-library/react';
import { useCachedFetch } from './useCachedFetch';

describe('useCachedFetch', () => {
  const mockData = { test: 'data' };
  const mockUrl = 'https://api.example.com/data';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('should fetch and cache data on initial load', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useCachedFetch(mockUrl));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe('');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe('');

    const cachedData = localStorage.getItem(mockUrl);
    expect(cachedData).toBeTruthy();
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      expect(parsed.cache).toEqual(mockData);
      expect(parsed.time).toBeDefined();
    }
  });

  it('should use cached data if within 5 minutes', async () => {
    const cachedTime = Date.now();
    localStorage.setItem(
      mockUrl,
      JSON.stringify({
        time: cachedTime,
        cache: mockData,
      }),
    );

    const { result } = renderHook(() => useCachedFetch(mockUrl));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should fetch new data if cache is older than 5 minutes', async () => {
    const oldData = { test: 'old' };
    const fiveMinutesAndOneMs = 5 * 60 * 1000 + 1;

    localStorage.setItem(
      mockUrl,
      JSON.stringify({
        time: Date.now() - fiveMinutesAndOneMs,
        cache: oldData,
      }),
    );

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useCachedFetch(mockUrl));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'HTTP error! status: 404';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useCachedFetch(mockUrl));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
