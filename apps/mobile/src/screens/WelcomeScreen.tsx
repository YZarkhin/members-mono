import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStore } from '@nanostores/react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { $members, cn, useSettings } from '@members/shared';

import type { RootStackParamList } from '../../App';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { MemberListItem } from '../components/MemberListItem';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const MemberSeparator = () => {
  return <View className="h-3" />;
};

export const WelcomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const members = useStore($members);
  const { theme } = useSettings();
  const isDark = theme === 'dark';
  const editMember = (memberId: string) => {
    navigation.navigate('Profile', { memberId });
  };

  return (
    <View
      className={cn('flex-1 p-5', {
        'bg-paper': !isDark,
        'bg-paperDark': isDark,
      })}
    >
      <Animated.View entering={FadeInDown.duration(260)} className="gap-6">
        <View className="gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </View>
        <View className="gap-4">
          <Text
            className={cn('text-4xl font-bold leading-tight', {
              'text-ink': !isDark,
              'text-inkDark': isDark,
            })}
          >
            {t('app.title')}
          </Text>
        </View>

        <View className="flex-row items-center justify-between gap-4 mb-2">
          <Text
            className={cn('text-lg font-bold', {
              'text-ink': !isDark,
              'text-inkDark': isDark,
            })}
          >
            {t('home.memberCount', { count: members.length })}
          </Text>
          <Pressable
            className={cn('rounded-lg px-4 py-3', {
              'bg-fern': !isDark,
              'bg-fernDark': isDark,
            })}
            onPress={() => navigation.navigate('Profile', undefined)}
          >
            <Text className="text-center font-bold text-white">
              {t('home.cta')}
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      <FlatList
        contentContainerClassName="py-4"
        data={members}
        ItemSeparatorComponent={MemberSeparator}
        keyExtractor={member => member.id}
        ListEmptyComponent={
          <View
            className={cn('rounded-lg border p-4', {
              'border-border bg-surface': !isDark,
              'border-borderDark bg-surfaceDark': isDark,
            })}
          >
            <Text
              className={cn({
                'text-muted': !isDark,
                'text-mutedDark': isDark,
              })}
            >
              {t('home.empty')}
            </Text>
          </View>
        }
        renderItem={({ item: member }) => (
          <MemberListItem member={member} onEdit={editMember} />
        )}
      />
    </View>
  );
};
