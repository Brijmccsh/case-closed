import { Ionicons } from '@expo/vector-icons';

import { haptic } from '@/lib/haptics';
import { radius, space, useTheme } from '@/theme/useTheme';

import { PressableScale } from './PressableScale';
import { Text } from './Text';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
};

export function Chip({ label, selected, onPress, icon, color }: Props) {
  const { c } = useTheme();
  const fg = selected ? c.primaryOn : color ?? c.ink;
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      onPress={() => {
        haptic.tap();
        onPress?.();
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: space[4],
        height: 40,
        borderRadius: radius.pill,
        backgroundColor: selected ? c.ink : c.surface,
        borderWidth: 1,
        borderColor: selected ? c.ink : c.border,
      }}
    >
      {icon && <Ionicons name={icon} size={16} color={selected ? c.bg : fg} />}
      <Text variant="small" weight="semibold" style={{ color: selected ? c.bg : fg }} numberOfLines={1}>
        {label}
      </Text>
      {selected && <Ionicons name="checkmark" size={16} color={c.bg} />}
    </PressableScale>
  );
}
