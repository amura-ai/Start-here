import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import CreateCustomTheme, { type ThemePaletteMode } from './index';

export type ThemeModePref = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'amura-theme-mode';

interface ThemeModeContextValue {
  /** User-facing preference (what the toggle reflects). */
  mode: ThemeModePref;
  /** Resolved palette mode actually applied to MUI ('system' → OS). */
  effectiveMode: ThemePaletteMode;
  setMode: (next: ThemeModePref) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

function readStoredMode(): ThemeModePref {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  } catch {
    // localStorage unavailable (SSR / private mode) — fall through
  }
  return 'system';
}

function getSystemMode(): ThemePaletteMode {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeModePref>(readStoredMode);
  const [systemMode, setSystemMode] = useState<ThemePaletteMode>(getSystemMode);

  // Listen for OS-level theme changes; only re-render when relevant.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) =>
      setSystemMode(e.matches ? 'dark' : 'light');
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const setMode = useCallback((next: ThemeModePref) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — preference will just not persist
    }
  }, []);

  const effectiveMode: ThemePaletteMode =
    mode === 'system' ? systemMode : mode;

  const theme = useMemo(() => CreateCustomTheme({}, effectiveMode), [effectiveMode]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({ mode, effectiveMode, setMode }),
    [mode, effectiveMode, setMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used inside <ThemeModeProvider>');
  }
  return ctx;
}
