import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { haptic } from '@/lib/haptics';
import { space, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

/** Minimal shape of the bottom-tabs props we use (avoids importing @react-navigation/bottom-tabs). */
export type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: {
    emit: (e: { type: 'tabPress'; target: string; canPreventDefault: true }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: Record<string, { label: string; icon: IconName; active: IconName }> = {
  index: { label: 'Home', icon: 'newspaper-outline', active: 'newspaper' },
  explore: { label: 'Explore', icon: 'search-outline', active: 'search' },
  write: { label: 'Write', icon: 'create-outline', active: 'create' },
  docket: { label: 'My Docket', icon: 'folder-open-outline', active: 'folder-open' },
};

export function TabBar({ state, navigation }: TabBarProps) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: c.surface,
        borderTopWidth: 1,
        borderTopColor: c.border,
        paddingTop: space[2],
        paddingBottom: Math.max(insets.bottom, space[2]),
      }}
    >
      {state.routes.map((route, i) => {
        const tab = TABS[route.name];
        if (!tab) return null;
        const focused = state.index === i;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={tab.label}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) {
                haptic.tap();
                navigation.navigate(route.name);
              }
            }}
            style={{ flex: 1, alignItems: 'center', gap: 3 }}
          >
            <View
              style={{
                width: 56,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? c.primarySoft : 'transparent',
              }}
            >
              <Ionicons name={focused ? tab.active : tab.icon} size={22} color={focused ? c.primaryText : c.inkFaint} />
            </View>
            <Text variant="micro" numberOfLines={1} color={focused ? 'ink' : 'inkFaint'}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
