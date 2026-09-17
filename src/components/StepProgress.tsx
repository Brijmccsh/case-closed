import { View } from 'react-native';

import { briefSteps } from '@/data/coach';
import { space, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

export function StepProgress({ index }: { index: number }) {
  const { c } = useTheme();
  return (
    <View style={{ gap: space[2] }}>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        {briefSteps.map((s, i) => (
          <View key={s.id} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i <= index ? c.brand : c.border }} />
        ))}
      </View>
      <Text variant="stamp" color="inkMuted">
        {`Step ${index + 1} of ${briefSteps.length}  ·  ${briefSteps[index].label}`}
      </Text>
    </View>
  );
}
