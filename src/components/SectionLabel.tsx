import type { ReactNode } from 'react';
import { View } from 'react-native';

import { space } from '@/theme/useTheme';

import { Text } from './Text';

export function SectionLabel({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: space[6], marginBottom: space[3] }}>
      <Text variant="stamp" color="inkMuted">
        {title}
      </Text>
      {right}
    </View>
  );
}
