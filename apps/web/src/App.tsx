import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { useTranslation } from "react-i18next";

import { useSettings } from "@members/shared";

import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";

export const App = () => {
  const { t } = useTranslation();
  const { theme } = useSettings();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <Router basename="/members-mono">
      <div className="min-h-screen bg-background font-sans text-ink dark:bg-backgroundDark dark:text-inkDark">
        <div className="mx-auto max-w-[960px] px-4 py-10 max-[720px]:px-2.5 max-[720px]:py-5">
          <header className="mb-6 flex items-start justify-between gap-6 max-[720px]:flex-col">
            <div>
              <h1 className="max-w-[760px] text-[clamp(2rem,4vw,4rem)] leading-none uppercase text-accentStrong dark:text-accentStrongDark">
                {t("app.title")}
              </h1>
            </div>
            <div className="flex flex-col items-end gap-2.5 max-[720px]:w-full max-[720px]:items-stretch">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:memberId" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
