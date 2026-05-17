import { cn, useSettings } from "@members/shared";
import { useTranslation } from "react-i18next";

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useSettings();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-muted dark:border-borderDark dark:bg-surfaceDark dark:text-mutedDark max-[720px]:w-full"
      role="switch"
      aria-checked={isDark}
      aria-label={t("theme.toggle")}
      onClick={toggleTheme}
    >
      <span>{t("theme.light")}</span>
      <span
        className="inline-flex w-10 items-center rounded-full border border-border bg-panel p-0.5 dark:border-borderDark dark:bg-panelDark"
        aria-hidden="true"
      >
        <span
          className={cn(
            'h-4 w-4 rounded-full bg-accent shadow-sm transition-transform dark:bg-accentDark',
            {
              'translate-x-[18px]': isDark,
            },
          )}
        />
      </span>
      <span>{t("theme.dark")}</span>
    </button>
  );
};
