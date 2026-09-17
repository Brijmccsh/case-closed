import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { space, useTheme } from '@/theme/useTheme';

import { Card } from './Card';
import { Text } from './Text';

export function StatTile({ value, label, icon }: { value: string | number; label: string; icon: keyof typeof Ionicons.glyphMap }) {
  const { c } = useTheme();
  return (
    <Card style={{ flex: 1, minWidth: '45%', gap: space[1] }}>
      <Ionicons name={icon} size={20} color={c.brand} />
      <Text variant="display" style={{ fontSize: 40 }}>
        {value}
      </Text>
      <Text variant="stamp" color="inkMuted">
        {label}
      </Text>
    </Card>
  );
}
