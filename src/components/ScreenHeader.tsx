import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { safeBack } from '@/lib/nav';
import { space, useTheme } from '@/theme/useTheme';

import { PressableScale } from './PressableScale';
import { Text } from './Text';

type Props = { title?: string; right?: ReactNode; onBack?: () => void; icon?: 'back' | 'close' };

export function ScreenHeader({ title, right, onBack = safeBack, icon = 'back' }: Props) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + space[1],
        paddingHorizontal: space[3],
        paddingBottom: space[2],
        flexDirection: 'row',
        alignItems: 'center',
        gap: space[2],
        backgroundColor: c.bg,
      }}
    >
      <IconButton icon={icon === 'back' ? 'chevron-back' : 'close'} label={icon === 'back' ? 'Back' : 'Close'} onPress={onBack} />
      <View style={{ flex: 1 }}>
        {title ? (
          <Text variant="stamp" color="inkMuted" numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

export function IconButton({
  icon,
  label,
  onPress,
  active,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  active?: boolean;
}) {
  const { c } = useTheme();
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      onPress={onPress}
      style={{
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? c.primarySoft : c.surface,
        borderWidth: 1,
        borderColor: active ? c.primarySoft : c.border,
      }}
    >
      <Ionicons name={icon} size={22} color={active ? c.primaryText : c.ink} />
    </PressableScale>
  );
}
