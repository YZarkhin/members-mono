import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { cn, useSettings } from '@members/shared';

export function ThemeSwitcher() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useSettings();
  const isDark = theme === 'dark';

  return (
    <Pressable
      accessibilityLabel={t('theme.toggle')}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      className={cn(
        'flex-row items-center justify-between rounded-lg border p-2',
        {
          'border-border bg-control': !isDark,
          'border-borderDark bg-controlDark': isDark,
        },
      )}
      onPress={toggleTheme}
    >
      <Text
        className={cn('font-semibold', {
          'text-ink': !isDark,
          'text-inkDark': isDark,
        })}
      >
        {isDark ? t('theme.dark') : t('theme.light')}
      </Text>
      <View
        className={cn('h-7 w-12 justify-center rounded-full p-1', {
          'bg-surface': !isDark,
          'bg-surfaceDark': isDark,
        })}
      >
        <View
          className={cn('h-5 w-5 rounded-full bg-fern', {
            'self-start': !isDark,
            'self-end bg-fernDark': isDark,
          })}
        />
      </View>
    </Pressable>
  );
}
