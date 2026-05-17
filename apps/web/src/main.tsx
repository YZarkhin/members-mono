import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  $settings,
  initializeI18n,
  initializeStorePersistence,
  type StoreStorage,
  type SupportedTheme,
} from "@members/shared";

import { App } from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);
const initialTheme: SupportedTheme =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const webStorage: StoreStorage = {
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
};

void initializeStorePersistence(webStorage, {
  fallbackSettings: { theme: initialTheme },
})
  .then(() => initializeI18n($settings.get().locale))
  .then(() => {
    const theme = $settings.get().theme;

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
