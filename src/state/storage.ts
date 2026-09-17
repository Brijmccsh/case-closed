import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';

export const KEYS = {
  session: 'cc.session.v1',
  progress: 'cc.progress.v1',
  briefs: 'cc.briefs.v1',
} as const;

/** State mirrored to AsyncStorage. `ready` flips true after the first read. */
export function usePersistentState<T>(key: string, initial: () => T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (raw) setValue(JSON.parse(raw) as T);
      })
      .catch(() => {})
      .finally(() => {
        hydrated.current = true;
        setReady(true);
      });
  }, [key]);

  useEffect(() => {
    if (hydrated.current) AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});
  }, [key, value]);

  const update = useCallback((next: T | ((prev: T) => T)) => setValue(next), []);
  return [value, update, ready] as const;
}
