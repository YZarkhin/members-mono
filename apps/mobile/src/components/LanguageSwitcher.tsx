import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  changeAppLanguage,
  cn,
  supportedLocales,
  useSettings,
} from '@members/shared';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locale, theme } = useSettings();
  const isDark = theme === 'dark';

  return (
    <View
      className={cn('flex-row rounded-lg border p-1', {
        'border-border bg-control': !isDark,
        'border-borderDark bg-controlDark': isDark,
      })}
    >
      {supportedLocales.map(item => (
        <Pressable
          key={item}
          accessibilityRole="button"
          accessibilityState={{ selected: locale === item }}
          className={cn('flex-1 rounded-md px-3 py-2', {
            'bg-paper': locale === item && !isDark,
            'bg-surfaceDark': locale === item && isDark,
            'bg-transparent': locale !== item,
          })}
          onPress={() => void changeAppLanguage(item)}
        >
          <Text
            className={cn('text-center font-semibold', {
              'text-ink': !isDark,
              'text-inkDark': isDark,
            })}
          >
            {t(`language.${item}`)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
