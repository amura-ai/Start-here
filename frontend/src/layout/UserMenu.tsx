import { useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';

import { AuthUser } from '../auth/AuthContext';
import { useThemeMode, type ThemeModePref } from '../theme/ThemeMode';
import { useStyles } from './UserMenu.styles';

interface UserMenuProps {
  user: AuthUser;
  onSignOut: () => void;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0]?.[0]?.toUpperCase() || '?';
};

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SystemIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);

const THEME_OPTIONS: { value: ThemeModePref; label: string; icon: () => JSX.Element }[] = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: SystemIcon },
];

export default function UserMenu({ user, onSignOut }: UserMenuProps) {
  const { classes, cx } = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const { mode, setMode } = useThemeMode();

  const initials = getInitials(user.displayName);

  const handleSignOut = () => {
    setOpen(false);
    onSignOut();
  };

  return (
    <>
      <div
        ref={anchorRef}
        className={classes.avatar}
        onClick={() => setOpen(true)}
        data-testid="user-menu-avatar"
      >
        {initials}
      </div>

      <Popover
        className={classes.popover}
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div className={classes.popoverContent}>
          <div className={classes.userName}>{user.displayName}</div>
          {user.phone && <div className={classes.userPhone}>{user.phone}</div>}

          <Divider className={classes.divider} />

          <div className={classes.themeLabel}>Theme</div>
          <div
            className={classes.themeSwitcher}
            role="radiogroup"
            aria-label="Theme"
            data-testid="theme-switcher"
          >
            {THEME_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = mode === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={cx(classes.themeOption, active && classes.themeOptionActive)}
                  onClick={() => setMode(opt.value)}
                  data-testid={`theme-option-${opt.value}`}
                >
                  <Icon />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <Divider className={classes.divider} />

          <button
            className={classes.signOutButton}
            onClick={handleSignOut}
            data-testid="sign-out-button"
          >
            <svg
              className={classes.signOutIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </Popover>
    </>
  );
}
