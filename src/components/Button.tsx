import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { haptic } from '@/lib/haptics';
import type { Palette } from '@/theme/tokens/colors.dark';
import { radius, space, useTheme } from '@/theme/useTheme';

import { PressableScale } from './PressableScale';
import { Text } from './Text';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onInk' | 'accent';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: 'md' | 'sm';
  icon?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
};

export function Button({ label, onPress, variant = 'primary', size = 'md', icon, iconRight, disabled, loading, full, style, accessibilityHint }: Props) {
  const { c } = useTheme();
  const palette: Record<Variant, { bg: string; fg: keyof Palette; border: string }> = {
    primary: { bg: c.primary, fg: 'primaryOn', border: c.primary },
    secondary: { bg: c.surface, fg: 'ink', border: c.borderStrong },
    ghost: { bg: 'transparent', fg: 'primaryText', border: 'transparent' },
    onInk: { bg: 'transparent', fg: 'onSurfaceInk', border: 'rgba(244,241,234,0.4)' },
    accent: { bg: c.accent, fg: 'primaryOn', border: c.accent },
  };
  const p = palette[variant];
  const h = size === 'md' ? 54 : 40;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled || loading}
      onPress={() => {
        haptic.tap();
        onPress?.();
      }}
      style={[
        styles.base,
        {
          height: h,
          paddingHorizontal: size === 'md' ? space[6] : space[4],
          backgroundColor: p.bg,
          borderColor: p.border,
          opacity: disabled ? 0.45 : 1,
          alignSelf: full ? 'stretch' : 'flex-start',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={c[p.fg]} />
      ) : (
        <View style={styles.row}>
          {icon && <Ionicons name={icon} size={size === 'md' ? 20 : 16} color={c[p.fg]} />}
          <Text variant={size === 'md' ? 'bodyStrong' : 'small'} weight="bold" color={p.fg} numberOfLines={1}>
            {label}
          </Text>
          {iconRight && <Ionicons name={iconRight} size={size === 'md' ? 20 : 16} color={c[p.fg]} />}
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.pill, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
});
