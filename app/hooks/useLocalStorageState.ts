import { useState, useEffect } from "react";

function useLocalStorageState(
  key: string,
  initialValue: string,
  stringify?: boolean,
) {
  const [value, setValue] = useState(() => {
    const persistedValue = localStorage.getItem(key);
    return persistedValue !== null
      ? stringify
        ? JSON.parse(persistedValue)
        : persistedValue
      : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
  }, [key, value, stringify]);

  return [value, setValue];
}

export default useLocalStorageState;
