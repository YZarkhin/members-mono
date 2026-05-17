import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { useState } from 'react';
import {
  type GestureResponderEvent,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { cn, useSettings } from '@members/shared';

type DateInputProps = {
  errorMessage?: string;
  label: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
};

export function DateInput({
  errorMessage,
  label,
  onBlur,
  onChange,
  value,
}: DateInputProps) {
  const { t } = useTranslation();
  const { theme } = useSettings();
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() =>
    getDatePickerValue(value),
  );

  const closePicker = () => {
    setIsVisible(false);
    onBlur();
  };

  const openPicker = () => {
    setSelectedDate(getDatePickerValue(value));
    setIsVisible(true);
  };

  const commitDate = (date: Date) => {
    onChange(DateTime.fromJSDate(date).toISODate() ?? '');
  };

  const selectAndroidDate = (date: Date) => {
    commitDate(date);
    closePicker();
  };

  const keepPickerOpen = (event: GestureResponderEvent) => {
    event.stopPropagation();
  };

  const inputClassName = cn('rounded-lg border px-4 py-3', {
    'border-border bg-surface': !isDark,
    'border-borderDark bg-surfaceDark': isDark,
  });

  return (
    <View className="gap-2">
      <Text
        className={cn('font-semibold', {
          'text-ink': !isDark,
          'text-inkDark': isDark,
        })}
      >
        {label}
      </Text>
      <Pressable
        accessibilityRole="button"
        className={inputClassName}
        onPress={openPicker}
      >
        <Text
          className={cn({
            'text-muted': !value && !isDark,
            'text-mutedDark': !value && isDark,
            'text-ink': value && !isDark,
            'text-inkDark': value && isDark,
          })}
        >
          {getDateLabel(value, t('profile.dateOfBirthdayPlaceholder'))}
        </Text>
      </Pressable>
      {value ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            onChange('');
            onBlur();
          }}
        >
          <Text
            className={cn('font-semibold', {
              'text-muted': !isDark,
              'text-mutedDark': isDark,
            })}
          >
            {t('profile.clearDateOfBirthday')}
          </Text>
        </Pressable>
      ) : null}
      {isVisible && Platform.OS === 'android' ? (
        <DateTimePicker
          display="calendar"
          maximumDate={DateTime.now().toJSDate()}
          mode="date"
          onDismiss={closePicker}
          onValueChange={(_, date) => selectAndroidDate(date)}
          value={selectedDate}
        />
      ) : null}
      <Modal
        animationType="fade"
        onRequestClose={closePicker}
        transparent
        visible={isVisible && Platform.OS === 'ios'}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/40 px-5"
          onPress={closePicker}
        >
          <Pressable
            className={cn('w-full max-w-sm gap-4 rounded-lg border p-4', {
              'border-border bg-paper': !isDark,
              'border-borderDark bg-paperDark': isDark,
            })}
            onPress={keepPickerOpen}
          >
            <Text
              className={cn('text-lg font-bold', {
                'text-ink': !isDark,
                'text-inkDark': isDark,
              })}
            >
              {label}
            </Text>
            <DateTimePicker
              accentColor={isDark ? '#9be7b3' : '#2f7d4f'}
              display="spinner"
              mode="date"
              maximumDate={DateTime.now().toJSDate()}
              onValueChange={(_, date) => {
                setSelectedDate(date);
              }}
              textColor={isDark ? '#eef7f0' : '#1b241d'}
              themeVariant={isDark ? 'dark' : 'light'}
              value={selectedDate}
            />
            <View className="flex-row justify-end gap-3">
              <Pressable
                accessibilityRole="button"
                className={cn('rounded-lg px-4 py-2', {
                  'bg-control': !isDark,
                  'bg-controlDark': isDark,
                })}
                onPress={closePicker}
              >
                <Text
                  className={cn('font-semibold', {
                    'text-ink': !isDark,
                    'text-inkDark': isDark,
                  })}
                >
                  {t('profile.cancel')}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                className={cn('rounded-lg px-4 py-2', {
                  'bg-fern': !isDark,
                  'bg-fernDark': isDark,
                })}
                onPress={() => {
                  commitDate(selectedDate);
                  closePicker();
                }}
              >
                <Text className="font-semibold text-white">
                  {t('profile.done')}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      {errorMessage ? (
        <Text
          className={cn({
            'text-danger': !isDark,
            'text-dangerDark': isDark,
          })}
        >
          {t(errorMessage)}
        </Text>
      ) : null}
    </View>
  );
}

const getDatePickerValue = (value: string) => {
  const date = DateTime.fromISO(value);

  return date.isValid ? date.toJSDate() : new Date();
};

const getDateLabel = (value: string, placeholder: string) => {
  const date = DateTime.fromISO(value);

  return date.isValid ? date.toLocaleString(DateTime.DATE_MED) : placeholder;
};
