/* eslint-disable react/react-in-jsx-scope */
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from '@/api';

export { ErrorBoundary } from 'expo-router';

import '../../global.css';

export const unstable_settings = {
  initialRouteName: 'index ',
};

export default function RootLayoutNav() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: 'none' }}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: false, animation: 'none' }}
        />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <APIProvider>
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </APIProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
