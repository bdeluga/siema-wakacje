import { useEffect, useState } from "react";

export const useDebounceValue = (value: string, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [delayMs, value]);

  return { debouncedValue };
};
