import { useCallback, useRef } from "react";

function useThrottleFn<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  const lastCall = useRef(0);

  const throttledFn = useCallback((...args: any[]) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      fn(...args);
    }
  }, [fn, delay]);

  console.log("리렌더링");

  return throttledFn as T;
}

export default useThrottleFn;
