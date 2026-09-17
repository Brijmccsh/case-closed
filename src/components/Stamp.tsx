import { View } from 'react-native';

import type { Palette } from '@/theme/tokens/colors.dark';
import { space } from '@/theme/useTheme';

import { Text } from './Text';

/** Condensed uppercase label row: SUPREME COURT · 2021 · 8–1 */
export function Stamp({ parts, color = 'inkMuted' }: { parts: (string | number)[]; color?: keyof Palette }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[1] }}>
      <Text variant="stamp" color={color} numberOfLines={1}>
        {parts.join('  ·  ')}
      </Text>
    </View>
  );
}
