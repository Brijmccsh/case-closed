import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { radius, shadow, space, useTheme } from '@/theme/useTheme';

import { PressableScale } from './PressableScale';

type Props = ViewProps & {
  onPress?: () => void;
  tone?: 'surface' | 'ink' | 'soft' | 'alt';
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Card({ onPress, tone = 'surface', padded = true, style, children, accessibilityLabel, ...rest }: Props) {
  const { c, isDark } = useTheme();
  const bg = { surface: c.surface, ink: c.surfaceInk, soft: c.primarySoft, alt: c.surfaceAlt }[tone];
  const base: StyleProp<ViewStyle> = [
    {
      backgroundColor: bg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: tone === 'ink' ? 'transparent' : tone === 'soft' ? 'transparent' : c.border,
      padding: padded ? space[4] : 0,
    },
    isDark ? null : shadow.sm,
    style,
  ];
  if (onPress) {
    return (
      <PressableScale accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={base} {...rest}>
        {children}
      </PressableScale>
    );
  }
  return (
    <View style={base} {...rest}>
      {children}
    </View>
  );
}
