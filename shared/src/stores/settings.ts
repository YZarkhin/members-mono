import { atom } from "nanostores";

export const supportedLocales = ["en", "ro"] as const;
export const supportedThemes = ["light", "dark"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];
export type SupportedTheme = (typeof supportedThemes)[number];

export type SettingsState = {
  locale: SupportedLocale;
  theme: SupportedTheme;
};

export const $settings = atom<SettingsState>({
  locale: "en",
  theme: "light",
});

export const setLocale = (locale: SupportedLocale) => {
  $settings.set({ ...$settings.get(), locale });
};

export const setTheme = (theme: SupportedTheme) => {
  $settings.set({ ...$settings.get(), theme });
};

export const toggleTheme = () => {
  const nextTheme = $settings.get().theme === "dark" ? "light" : "dark";

  setTheme(nextTheme);
};

export const isSupportedLocale = (locale: string): locale is SupportedLocale =>
  supportedLocales.includes(locale as SupportedLocale);
