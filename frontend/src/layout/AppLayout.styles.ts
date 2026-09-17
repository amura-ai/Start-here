import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.colors.system.white,
    color: theme.palette.colors.gray[900],
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    minHeight: '56px',
    padding: '0 24px',
    backgroundColor: theme.palette.colors.system.white,
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
    color: theme.palette.colors.gray[900],
    zIndex: 20,
    '@media (max-width: 768px)': {
      padding: '0 12px',
    },
  },
  headerTitle: {
    fontFamily: 'Graphik',
    fontSize: '17px',
    fontWeight: 600,
    lineHeight: '24px',
    color: theme.palette.colors.gray[900],
    '& svg path': {
      fill: theme.palette.colors.gray[900],
    },
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: theme.palette.colors.gray[25],
  },
}));
