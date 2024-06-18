import { throttle } from "../utils/throttle";
import { useCallback, useEffect, useRef, useState } from "react";
interface ThrottleOptions {
    leading?: boolean,
    trailing?: boolean
}
export function useThrottle<T>(
    valueState: T,
    delay: number,
    options?: ThrottleOptions
  ) {
    const [throttleValue, setThrottleValue] = useState<T>();
  
    const setThrottle = useCallback(
      throttle(setThrottleValue, delay, options),
      []
    );
    useEffect(() => {
      setThrottle(valueState);
    }, [valueState]);
  
    return throttleValue;
  }