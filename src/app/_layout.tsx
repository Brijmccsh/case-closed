import { BarlowCondensed_600SemiBold, BarlowCondensed_700Bold } from '@expo-google-fonts/barlow-condensed';
import { Newsreader_400Regular_Italic } from '@expo-google-fonts/newsreader';
import { PublicSans_400Regular, PublicSans_500Medium, PublicSans_600SemiBold, PublicSans_700Bold } from '@expo-google-fonts/public-sans';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BriefsProvider, useBriefs } from '@/state/BriefsContext';
import { ProgressProvider, useProgress } from '@/state/ProgressContext';
import { SessionProvider, useSession } from '@/state/SessionContext';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { useTheme } from '@/theme/useTheme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
    Newsreader_400Regular_Italic,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SessionProvider>
          <ProgressProvider>
            <BriefsProvider>
              <RootStack fontsReady={fontsLoaded || !!fontError} />
            </BriefsProvider>
          </ProgressProvider>
        </SessionProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function RootStack({ fontsReady }: { fontsReady: boolean }) {
  const { c } = useTheme();
  const session = useSession();
  const progress = useProgress();
  const briefs = useBriefs();
  const ready = fontsReady && session.ready && progress.ready && briefs.ready;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }}>
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="(auth)" options={{ gestureEnabled: false, animation: 'fade' }} />
      <Stack.Screen
        name="glossary/[term]"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.85],
          sheetGrabberVisible: true,
          sheetCornerRadius: 28,
          contentStyle: { backgroundColor: c.bg },
        }}
      />
    </Stack>
  );
}
