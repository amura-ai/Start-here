import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from 'tss-react/mui';

import { useThemeMode, type ThemeModePref } from '../theme/ThemeMode';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SystemIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);

// Cycle order: system → light → dark → system
const NEXT_MODE: Record<ThemeModePref, ThemeModePref> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};

const LABEL: Record<ThemeModePref, string> = {
  system: 'Theme: System (click for Light)',
  light: 'Theme: Light (click for Dark)',
  dark: 'Theme: Dark (click for System)',
};

const useStyles = makeStyles()((theme) => ({
  button: {
    'width': '36px',
    'height': '36px',
    'borderRadius': '50%',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'border': `1px solid ${theme.palette.colors.gray[100]}`,
    'backgroundColor': theme.palette.colors.system.white,
    'color': theme.palette.colors.gray[700],
    'cursor': 'pointer',
    'padding': 0,
    'transition': 'color 0.15s ease, background-color 0.15s ease, transform 0.15s ease',
    '&:hover': {
      color: theme.palette.colors.gray[900],
      transform: 'scale(1.04)',
    },
  },
}));

/**
 * Compact one-click theme cycler. Always renders a single icon
 * reflecting the *current preference* (not the resolved mode), so
 * the user can see whether they're on 'system' or have explicitly
 * picked a mode.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { classes, cx } = useStyles();
  const { mode, setMode } = useThemeMode();

  const Icon = mode === 'dark' ? MoonIcon : mode === 'light' ? SunIcon : SystemIcon;

  return (
    <Tooltip title={LABEL[mode]} placement="bottom-end">
      <button
        type="button"
        className={cx(classes.button, className)}
        onClick={() => setMode(NEXT_MODE[mode])}
        aria-label={LABEL[mode]}
        data-testid="theme-toggle"
      >
        <Icon />
      </button>
    </Tooltip>
  );
}
