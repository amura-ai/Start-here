import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: theme.palette.colors.gray[900],
    color: theme.palette.colors.system.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Graphik',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 0.85,
    },
  },
  popover: {
    '& .MuiPaper-root': {
      borderRadius: '8px',
      boxShadow: theme.palette.mode === 'dark'
        ? '0px 4px 24px rgba(0, 0, 0, 0.55)'
        : '0px 4px 16px rgba(0, 0, 0, 0.12)',
      minWidth: '240px',
      marginTop: '8px',
      backgroundColor: theme.palette.colors.system.white,
      backgroundImage: 'none',
      border: `1px solid ${theme.palette.colors.gray[100]}`,
    },
  },
  popoverContent: {
    padding: '16px',
  },
  userName: {
    fontFamily: 'Graphik',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.colors.gray[900],
    marginBottom: '4px',
  },
  userPhone: {
    fontFamily: 'Graphik',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '18px',
    color: theme.palette.colors.gray[500],
  },
  divider: {
    margin: '12px 0',
    borderColor: theme.palette.colors.gray[100],
  },
  themeLabel: {
    fontFamily: 'Graphik',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: theme.palette.colors.gray[500],
    marginBottom: '8px',
  },
  themeSwitcher: {
    display: 'flex',
    gap: '4px',
    padding: '3px',
    borderRadius: '8px',
    backgroundColor: theme.palette.colors.gray[50],
  },
  themeOption: {
    'flex': 1,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'gap': '6px',
    'padding': '6px 4px',
    'borderRadius': '6px',
    'border': 'none',
    'backgroundColor': 'transparent',
    'fontFamily': 'Graphik',
    'fontSize': '12px',
    'fontWeight': 500,
    'color': theme.palette.colors.gray[500],
    'cursor': 'pointer',
    'transition': 'background-color 0.15s ease, color 0.15s ease',
    '&:hover': {
      color: theme.palette.colors.gray[900],
    },
    '& svg': {
      flexShrink: 0,
    },
  },
  themeOptionActive: {
    'backgroundColor': theme.palette.colors.system.white,
    'color': theme.palette.colors.gray[900],
    'boxShadow': theme.palette.mode === 'dark'
      ? '0px 1px 2px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.04)'
      : '0px 1px 2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.04)',
    '&:hover': {
      color: theme.palette.colors.gray[900],
    },
  },
  signOutButton: {
    'display': 'flex',
    'alignItems': 'center',
    'gap': '8px',
    'width': '100%',
    'padding': '8px 0',
    'border': 'none',
    'backgroundColor': 'transparent',
    'fontFamily': 'Graphik',
    'fontSize': '14px',
    'fontWeight': 500,
    'color': theme.palette.colors.gray[500],
    'cursor': 'pointer',
    'borderRadius': '4px',
    'transition': 'color 0.2s ease',
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
  signOutIcon: {
    width: '16px',
    height: '16px',
  },
}));
