module.exports = {
  preset: '@react-native/jest-preset',
  resolver: 'react-native-worklets/jest/resolver',
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/../../node_modules/@react-native-async-storage/async-storage/src/jest/AsyncStorageMock.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-async-storage|@react-navigation|@nanostores|nanostores|nativewind|react-native-css-interop|react-native-reanimated|react-native-worklets)/)',
  ],
};
