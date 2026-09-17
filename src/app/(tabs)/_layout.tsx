import { Redirect, Tabs } from 'expo-router';

import { TabBar, type TabBarProps } from '@/components/TabBar';
import { useSession } from '@/state/SessionContext';
import { useTheme } from '@/theme/useTheme';

export default function TabsLayout() {
  const { c } = useTheme();
  const { user, onboarded } = useSession();

  if (!user) return <Redirect href="/welcome" />;
  if (!onboarded) return <Redirect href="/onboarding" />;

  return (
    <Tabs
      tabBar={(props) => <TabBar {...(props as unknown as TabBarProps)} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: c.bg } }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="write" />
      <Tabs.Screen name="docket" />
    </Tabs>
  );
}
