import React from 'react';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    colors: {
      gray: {
        900: React.CSSProperties['color'];
        700: React.CSSProperties['color'];
        600: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        300: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        100: React.CSSProperties['color'];
        75: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
        25: React.CSSProperties['color'];
      };
      green: {
        700: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      red: {
        700: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      orange: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      blue: {
        700: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      system: {
        link: React.CSSProperties['color'];
        delete: React.CSSProperties['color'];
        error: React.CSSProperties['color'];
        white: React.CSSProperties['color'];
        divider: React.CSSProperties['color'];
        black: React.CSSProperties['color'];
      };
      theme: {
        primary: React.CSSProperties['color'];
        secondary: React.CSSProperties['color'];
        primaryLight: React.CSSProperties['color'];
      };
    };
    customShadow: {
      scroll: React.CSSProperties;
    };
  }
  interface PaletteOptions {
    colors: {
      gray: {
        900: React.CSSProperties['color'];
        700: React.CSSProperties['color'];
        600: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        300: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        100: React.CSSProperties['color'];
        75: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
        25: React.CSSProperties['color'];
      };
      green: {
        700: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      red: {
        700: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      orange: {
        700: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      blue: {
        700: React.CSSProperties['color'];
        500: React.CSSProperties['color'];
        400: React.CSSProperties['color'];
        200: React.CSSProperties['color'];
        50: React.CSSProperties['color'];
      };
      system: {
        link: React.CSSProperties['color'];
        delete: React.CSSProperties['color'];
        error: React.CSSProperties['color'];
        white: React.CSSProperties['color'];
        divider: React.CSSProperties['color'];
        black: React.CSSProperties['color'];
      };
      theme: {
        primary: React.CSSProperties['color'];
        secondary: React.CSSProperties['color'];
        primaryLight: React.CSSProperties['color'];
      };
    };
  }
}

export const lightColors = {
  gray: {
    900: '#252427',
    700: '#818084',
    600: '#373639',
    500: '#5C5A61',
    400: '#A6A6A6',
    300: '#C4C4C4',
    200: '#E9E8E8',
    100: '#E1E1E1',
    75: '#E9E8E8',
    50: '#F1F1F1',
    25: '#F8F8F8',
  },
  green: {
    700: '#40916C',
    500: '#4CAF50',
    400: '#52B788',
    200: '#B7E4C7',
    50: '#D8F3DC',
  },
  red: {
    700: '#AF2825',
    500: '#F45252',
    400: '#DA5552',
    200: '#FBC3BC',
    50: '#FFE3E0',
  },
  orange: {
    700: '#E45C3A',
    400: '#F3752B',
    200: '#FFC8A8',
    50: '#FFE8DB',
  },
  blue: {
    700: '#0096C7',
    500: '#2196F3',
    400: '#00B4D8',
    200: '#CAF0F8',
    50: '#E3FAFF',
  },
  system: {
    link: '#007AFF',
    delete: '#FF3B30',
    error: '#f44336',
    white: '#FFFFFF',
    black: '#000000',
    divider: '#D9D9D9',
  },
  theme: {
    primary: '#252427',
    secondary: '#58BA47',
    primaryLight: '#373639',
  },
};

// Dark palette — mirrors the light scale's *semantic role* per shade:
//   * gray[25] is the page background in light (near-white) → near-black here
//   * gray[900] is primary text in light (near-black) → near-white here
//   * system.white is the "card / surface" colour (sidebar, header, cards)  → dark surface
// Accents are nudged brighter for better contrast on dark surfaces.
export const darkColors = {
  gray: {
    900: '#F5F5F7', // primary text
    700: '#D4D4D8', // secondary text (bright)
    600: '#C7C7CB',
    500: '#9A9AA0', // muted text
    400: '#7A7A7E',
    300: '#5E5E64', // borders inverse
    200: '#3A3A3F',
    100: '#2E2E33', // borders / dividers
    75: '#2A2A2F',
    50: '#242428', // hover surface
    25: '#1A1A1D', // page background
  },
  green: {
    700: '#74C69D',
    500: '#52B788',
    400: '#74C69D',
    200: '#2D6A4F',
    50: '#1B4332',
  },
  red: {
    700: '#FF8A85',
    500: '#FF6B6B',
    400: '#FF8A85',
    200: '#7A2E2C',
    50: '#3D1A19',
  },
  orange: {
    700: '#FFB088',
    400: '#FF9F66',
    200: '#7A4429',
    50: '#3D2215',
  },
  blue: {
    700: '#5AC8FA',
    500: '#5AA9FF',
    400: '#64C7FF',
    200: '#1F3A5C',
    50: '#0E1F33',
  },
  system: {
    link: '#5AA9FF',
    delete: '#FF453A',
    error: '#FF6B6B',
    white: '#1E1E22', // surface / card / sidebar background
    black: '#FFFFFF',
    divider: '#2E2E33',
  },
  theme: {
    primary: '#F5F5F7',
    secondary: '#74C69D',
    primaryLight: '#D4D4D8',
  },
};

// Kept as `colors` export for backwards compatibility with anywhere that
// imports it directly (the light palette is still the default).
export const colors = lightColors;

export const shadows = {
  scroll: '4px 0px 24px rgb(0, 0, 0, 0.15)',
};

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      scroll: string;
    };
  }
  interface ThemeOptions {
    customShadows?: Theme['customShadows'];
  }
}
