import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import {
  cn,
  getMember,
  initialMemberValues,
  type MemberFormValues,
  useMemberForm,
  userRoles,
  useSettings,
} from '@members/shared';

import { DateInput } from '../components/DateInput';

type Props = {
  onDelete: () => void;
  onSubmit: (member: MemberFormValues) => void;
  memberId?: string;
  isEditing: boolean;
};

export const MemberForm = ({
  memberId,
  isEditing,
  onSubmit,
  onDelete,
}: Props) => {
  const member = getMember(memberId)
  const defaultValues = (isEditing && member) ? member : initialMemberValues;
  const { dateOfBirthday, fullName, role } = defaultValues;
  const { t } = useTranslation();
  const { theme } = useSettings();
  const insets = useSafeAreaInsets();
  const isDark = theme === 'dark';
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMemberForm({
    defaults: defaultValues,
  });

  useEffect(() => {
    reset({ dateOfBirthday, fullName, role });
  }, [dateOfBirthday, fullName, reset, role]);

  const inputClassName = cn('rounded-lg border px-4 py-3', {
    'border-border bg-surface text-ink': !isDark,
    'border-borderDark bg-surfaceDark text-inkDark': isDark,
  });
  const labelClassName = cn('font-semibold', {
    'text-ink': !isDark,
    'text-inkDark': isDark,
  });
  const errorClassName = cn({
    'text-danger': !isDark,
    'text-dangerDark': isDark,
  });

  return (
    <Animated.View entering={FadeInDown.duration(260)} className="flex-1 gap-4">
      <View className="gap-4">
        <Text
          className={cn('text-3xl font-bold', {
            'text-ink': !isDark,
            'text-inkDark': isDark,
          })}
        >
          {t(isEditing ? 'profile.editTitle' : 'profile.title')}
        </Text>

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onBlur, onChange, value } }) => (
            <View className="gap-2">
              <Text className={labelClassName}>{t('profile.fullName')}</Text>
              <TextInput
                className={inputClassName}
                autoCapitalize="words"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.fullName ? (
                <Text className={errorClassName}>
                  {t(errors.fullName.message ?? '')}
                </Text>
              ) : null}
            </View>
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View className="gap-2">
              <Text className={labelClassName}>{t('profile.role')}</Text>
              <View
                className={cn('flex-row rounded-lg border p-1', {
                  'border-border bg-control': !isDark,
                  'border-borderDark bg-controlDark': isDark,
                })}
              >
                {userRoles.map(userRole => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: value === userRole }}
                    className={cn('flex-1 rounded-md px-3 py-2', {
                      'bg-surface': value === userRole && !isDark,
                      'bg-surfaceDark': value === userRole && isDark,
                      'bg-transparent': value !== userRole,
                    })}
                    key={userRole}
                    onPress={() => onChange(userRole)}
                  >
                    <Text
                      className={cn('text-center font-semibold', {
                        'text-ink': !isDark,
                        'text-inkDark': isDark,
                      })}
                    >
                      {t(`profile.role.${userRole.toLowerCase()}`)}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.role ? (
                <Text className={errorClassName}>
                  {t(errors.role.message ?? '')}
                </Text>
              ) : null}
            </View>
          )}
        />

        <Controller
          control={control}
          name="dateOfBirthday"
          render={({ field: { onBlur, onChange, value } }) => (
            <DateInput
              errorMessage={errors.dateOfBirthday?.message}
              label={t('profile.dateOfBirthday')}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View
        className="mt-auto gap-3 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        <Pressable
          className={cn('rounded-lg px-4 py-3', {
            'bg-fern': !isDark,
            'bg-fernDark': isDark,
          })}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center font-bold text-white">
            {t(isEditing ? 'profile.update' : 'profile.save')}
          </Text>
        </Pressable>

        {isEditing ? (
          <Pressable
            className={cn('rounded-lg px-4 py-3', {
              'bg-danger': !isDark,
              'bg-dangerDark': isDark,
            })}
            onPress={onDelete}
          >
            <Text className="text-center font-bold text-white">
              {t('profile.delete')}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
};
