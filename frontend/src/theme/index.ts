import { ThemeOptions, createTheme } from '@mui/material/styles';

import { darkColors, lightColors } from './palettes';

export type ThemePaletteMode = 'light' | 'dark';

export default function CreateCustomTheme(
  options: ThemeOptions,
  mode: ThemePaletteMode = 'light',
) {
  const isDark = mode === 'dark';
  const palette = isDark ? darkColors : lightColors;

  return createTheme({
    palette: {
      mode,
      colors: palette,
      primary: {
        main: isDark ? '#F5F5F7' : '#3D3D3D',
        dark: isDark ? '#D4D4D8' : '#252427',
        light: isDark ? '#9A9AA0' : '#5C5A61',
        contrastText: isDark ? '#1A1A1D' : '#FFFFFF',
      },
      background: {
        // MUI CssBaseline paints <body> with these — keeps the page bg
        // in sync with the active theme automatically.
        default: isDark ? '#1A1A1D' : '#F7F7F7',
        paper: isDark ? '#1E1E22' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F5F5F7' : '#252427',
        secondary: isDark ? '#9A9AA0' : '#5C5A61',
      },
      divider: isDark ? '#2E2E33' : '#D9D9D9',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 1050,
        lg: 1400,
        xl: 1750,
      },
    },
    typography: {
      fontFamily: ['Graphik'].join(','),
    },
    spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32],
    customShadows: {
      scroll: isDark
        ? '4px 10px 24px rgb(0, 0, 0, 0.55)'
        : '4px 10px 24px rgb(0, 0, 0, 0.15)',
    },
    ...options,
  });
}
