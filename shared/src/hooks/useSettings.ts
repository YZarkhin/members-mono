import { useStore } from "@nanostores/react";

import { $settings, setLocale, setTheme, toggleTheme } from "../stores";

export const useSettings = () => {
  const settings = useStore($settings);

  return {
    ...settings,
    setLocale,
    setTheme,
    toggleTheme,
  };
};
