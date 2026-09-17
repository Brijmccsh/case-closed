import type { ReactNode } from 'react';
import { View } from 'react-native';

import { radius, space, useTheme } from '@/theme/useTheme';

import { Card } from './Card';
import { GlossaryText } from './GlossaryText';
import { Text } from './Text';

/** Numbered index-card section: 01 WHAT HAPPENED */
export function SectionBlock({ n, title, body, children }: { n: number; title: string; body?: string; children?: ReactNode }) {
  const { c } = useTheme();
  return (
    <Card style={{ gap: space[3], padding: space[5] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
        <View
          style={{
            minWidth: 34,
            height: 26,
            paddingHorizontal: 6,
            borderRadius: radius.xs,
            backgroundColor: c.ink,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="stamp" style={{ color: c.bg, letterSpacing: 1 }}>
            {String(n).padStart(2, '0')}
          </Text>
        </View>
        <Text variant="h2" style={{ flex: 1 }}>
          {title}
        </Text>
      </View>
      <View style={{ height: 1, backgroundColor: c.border }} />
      {body ? <GlossaryText body={body} /> : null}
      {children}
    </Card>
  );
}
