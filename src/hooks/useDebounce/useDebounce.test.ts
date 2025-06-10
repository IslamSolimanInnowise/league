import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should update value after delay', () => {
    const { result } = renderHook(() => useDebounce('test', 100));
    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('test');
  });

  it('clears previous timeout on value change', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 'test1' },
    });

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('');

    rerender({ value: 'test2' });

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('test2');
  });
});
