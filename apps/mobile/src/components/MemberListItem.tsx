import { DateTime } from 'luxon';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { cn, type Member, useSettings } from '@members/shared';

type MemberListItemProps = {
  member: Member;
  onEdit: (memberId: string) => void;
};

export function MemberListItem({ member, onEdit }: MemberListItemProps) {
  const { t } = useTranslation();
  const { theme } = useSettings();
  const isDark = theme === 'dark';

  return (
    <View
      className={cn('rounded-lg border p-4', {
        'border-border bg-surface': !isDark,
        'border-borderDark bg-surfaceDark': isDark,
      })}
    >
      <Text
        className={cn('text-xl font-bold', {
          'text-ink': !isDark,
          'text-inkDark': isDark,
        })}
      >
        {member.fullName}
      </Text>
      <Text
        className={cn({
          'text-muted': !isDark,
          'text-mutedDark': isDark,
        })}
      >
        {t(`profile.role.${member.role.toLowerCase()}`)}
      </Text>
      <Text
        className={cn('text-sm', {
          'text-muted': !isDark,
          'text-mutedDark': isDark,
        })}
      >
        {member.dateOfBirthday
          ? t('member.dateOfBirthday', {
              date: DateTime.fromISO(member.dateOfBirthday).toLocaleString(
                DateTime.DATE_MED,
              ),
            })
          : t('member.noBirthday')}
      </Text>
      <Text
        className={cn('text-sm', {
          'text-muted': !isDark,
          'text-mutedDark': isDark,
        })}
      >
        {t('profile.updatedAt', {
          time: DateTime.fromMillis(member.createdAt).toLocaleString(
            DateTime.DATETIME_MED,
          ),
        })}
      </Text>
      <Pressable
        className={cn('mt-2 rounded-lg px-4 py-3', {
          'bg-control': !isDark,
          'bg-controlDark': isDark,
        })}
        onPress={() => onEdit(member.id)}
      >
        <Text
          className={cn('text-center font-bold', {
            'text-ink': !isDark,
            'text-inkDark': isDark,
          })}
        >
          {t('member.edit')}
        </Text>
      </Pressable>
    </View>
  );
}
