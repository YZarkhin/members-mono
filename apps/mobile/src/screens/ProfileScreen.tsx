import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import {
  addMember,
  cn,
  deleteMember,
  type MemberFormValues,
  updateMember,
  useSettings,
  getMember,
} from '@members/shared';

import type { RootStackParamList } from '../../App';
import { MemberForm } from '../components/MemberForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ navigation, route }: Props) {
  const memberId = route.params?.memberId;
  const member = getMember(memberId)
  const isEditing = !!memberId
  const { t } = useTranslation();
  const { theme } = useSettings();
  const isDark = theme === 'dark';
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const showSuccessAndGoBack = () => {
    setIsSuccessVisible(true);
    successTimeoutRef.current = setTimeout(() => {
      navigation.goBack();
    }, 900);
  };

  const onSubmit = (values: MemberFormValues) => {
    if (memberId) {
      updateMember(memberId, values);
    } else {
      addMember(values);
    }

    showSuccessAndGoBack();
  };

  const onDelete = () => {
    if (!member || !memberId) {
      return;
    }

    Alert.alert(
      t('profile.deleteConfirmTitle'),
      t('profile.deleteConfirmMessage', { name: member.fullName }),
      [
        {
          style: 'cancel',
          text: t('profile.cancel'),
        },
        {
          onPress: () => {
            deleteMember(memberId);
            navigation.goBack();
          },
          style: 'destructive',
          text: t('profile.delete'),
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className={cn('flex-1 px-5 pt-5', {
        'bg-paper': !isDark,
        'bg-paperDark': isDark,
      })}
    >
      <MemberForm isEditing={isEditing} memberId={memberId} onSubmit={onSubmit} onDelete={onDelete} />

      {isSuccessVisible ? (
        <Animated.View
          entering={FadeIn.duration(160)}
          className="absolute inset-0 items-center justify-center bg-black/30 px-5"
        >
          <Animated.View
            entering={ZoomIn.duration(260)}
            className={cn('items-center gap-3 rounded-lg border p-6', {
              'border-border bg-surface': !isDark,
              'border-borderDark bg-surfaceDark': isDark,
            })}
          >
            <View
              className={cn(
                'h-14 w-14 items-center justify-center rounded-full',
                {
                  'bg-fern': !isDark,
                  'bg-fernDark': isDark,
                },
              )}
            >
              <Text className="text-3xl font-bold text-white">✓</Text>
            </View>
            <Text
              className={cn('text-lg font-bold', {
                'text-ink': !isDark,
                'text-inkDark': isDark,
              })}
            >
              {t(isEditing ? 'profile.updateSuccess' : 'profile.addSuccess')}
            </Text>
            <Text
              className={cn('text-center', {
                'text-muted': !isDark,
                'text-mutedDark': isDark,
              })}
            >
              {t('profile.successDetail')}
            </Text>
          </Animated.View>
        </Animated.View>
      ) : null}
    </KeyboardAvoidingView>
  );
}
