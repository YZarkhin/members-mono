import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import type { SupportedTheme } from '@members/shared';

const themeTokens = {
  light: {
    accent: '#0f7b62',
    background: '#fffdf8',
    border: '#d6cfc1',
    card: '#ffffff',
    danger: '#a23b28',
    text: '#17201a',
  },
  dark: {
    accent: '#35c69e',
    background: '#111613',
    border: '#37463d',
    card: '#19221d',
    danger: '#ff8f7f',
    text: '#f3f7f0',
  },
} satisfies Record<SupportedTheme, Record<string, string>>;

export const getThemeTokens = (theme: SupportedTheme) => themeTokens[theme];

export const getNavigationTheme = (theme: SupportedTheme): NavigationTheme => {
  const baseTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
  const tokens = getThemeTokens(theme);

  return {
    ...baseTheme,
    dark: theme === 'dark',
    colors: {
      ...baseTheme.colors,
      primary: tokens.accent,
      background: tokens.background,
      card: tokens.card,
      text: tokens.text,
      border: tokens.border,
      notification: tokens.danger,
    },
  };
};
