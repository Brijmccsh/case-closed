import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { light } from './tokens/colors.light';
import { dark, type Palette } from './tokens/colors.dark';
import { topics, type TopicId } from './tokens/topics';

export type ThemePref = 'system' | 'light' | 'dark';

export type Theme = {
  c: Palette;
  isDark: boolean;
  pref: ThemePref;
  setPref: (p: ThemePref) => void;
  topic: (id: TopicId) => { fg: string; bg: string; label: string; icon: (typeof topics)[TopicId]['icon'] };
};

const KEY = 'cc.themePref';

export const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [pref, setPrefState] = useState<ThemePref>('system');

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => {
      if (v === 'light' || v === 'dark' || v === 'system') setPrefState(v);
    });
  }, []);

  const setPref = useCallback((p: ThemePref) => {
    setPrefState(p);
    AsyncStorage.setItem(KEY, p);
  }, []);

  const isDark = pref === 'system' ? system === 'dark' : pref === 'dark';

  const value = useMemo<Theme>(
    () => ({
      c: isDark ? dark : light,
      isDark,
      pref,
      setPref,
      topic: (id) => {
        const t = topics[id];
        return isDark
          ? { fg: t.darkFg, bg: `${t.darkFg}22`, label: t.label, icon: t.icon }
          : { fg: t.fg, bg: t.bg, label: t.label, icon: t.icon };
      },
    }),
    [isDark, pref, setPref],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
