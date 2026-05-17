import {
  changeAppLanguage,
  cn,
  supportedLocales,
  useSettings,
} from "@members/shared";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { locale } = useSettings();

  return (
    <div
      className="flex gap-1 rounded-lg border border-border bg-surface p-1 dark:border-borderDark dark:bg-surfaceDark max-[720px]:w-full"
      aria-label="Language"
    >
      {supportedLocales.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={locale === item}
          className={cn(
            'whitespace-nowrap rounded-md border-0 bg-transparent px-3.5 py-2.5 text-muted no-underline max-[720px]:flex-1 dark:text-mutedDark',
            {
              'bg-panel text-ink shadow-sm dark:bg-panelDark dark:text-inkDark':
                locale === item,
            },
          )}
          onClick={() => void changeAppLanguage(item)}
        >
          {t(`language.${item}`)}
        </button>
      ))}
    </div>
  );
};
