import { View } from 'react-native';

import type { PullQuote as PQ } from '@/data/types';
import { space, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

export function PullQuote({ quote }: { quote: PQ }) {
  const { c } = useTheme();
  return (
    <View style={{ borderLeftWidth: 4, borderLeftColor: c.brand, paddingLeft: space[4], paddingVertical: space[1], gap: space[2] }}>
      <Text variant="quote">{`“${quote.text}”`}</Text>
      <Text variant="stamp" color="inkFaint">
        {`— ${quote.attribution}`}
      </Text>
    </View>
  );
}
