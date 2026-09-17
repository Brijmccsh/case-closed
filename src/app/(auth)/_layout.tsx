import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/state/SessionContext';
import { useTheme } from '@/theme/useTheme';

export default function AuthLayout() {
  const { c } = useTheme();
  const { user, onboarded } = useSession();

  // Finishing onboarding (or the demo sign-in) swaps the whole auth group for the tabs.
  if (user && onboarded) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }} />;
}
