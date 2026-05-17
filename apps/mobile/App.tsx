import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import {
  $settings,
  cn,
  initializeI18n,
  initializeStorePersistence,
  useSettings,
} from '@members/shared';

import { ProfileScreen } from './src/screens/ProfileScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { getNavigationTheme, getThemeTokens } from './src/theme';

export type RootStackParamList = {
  Welcome: undefined;
  Profile: { memberId?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useSettings();
  const navigationTheme = getNavigationTheme(theme);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: t('nav.home') }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: t('nav.profile') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const didInitialize = useRef(false);
  const { theme } = useSettings();
  const isDarkMode = theme === 'dark';
  const tokens = getThemeTokens(theme);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (didInitialize.current) {
      return;
    }

    const fallbackTheme = colorScheme === 'dark' ? 'dark' : 'light';
    didInitialize.current = true;

    void initializeStorePersistence(AsyncStorage, {
      fallbackSettings: { theme: fallbackTheme },
    })
      .then(() => initializeI18n($settings.get().locale))
      .then(() => setReady(true));
  }, [colorScheme]);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={tokens.background}
      />
      {ready ? (
        <AppNavigator />
      ) : (
        <View
          className={cn('flex-1 items-center justify-center', {
            'bg-paper': !isDarkMode,
            'bg-paperDark': isDarkMode,
          })}
        >
          <ActivityIndicator color={tokens.accent} />
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default App;
