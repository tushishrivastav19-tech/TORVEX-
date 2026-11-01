
import { useState } from "react";

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function updateValue(nextValue: T) {
    setValue(nextValue);
    try {
      localStorage.setItem(key, JSON.stringify(nextValue));
    } catch {
      console.error("TORVEX could not save data.");
    }
  }

  return [value, updateValue];
}
