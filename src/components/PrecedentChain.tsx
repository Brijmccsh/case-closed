import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Fragment } from 'react';
import { ScrollView, View } from 'react-native';

import { getItem } from '@/data/docket';
import { radius, space, useTheme } from '@/theme/useTheme';

import { PressableScale } from './PressableScale';
import { Text } from './Text';

/** Earlier case → this case → later case, joined by teal connectors. */
export function PrecedentChain({ id, before, after }: { id: string; before: string[]; after: string[] }) {
  const { c } = useTheme();
  const chain = [...before, id, ...after].map((x) => getItem(x)).filter((x) => !!x);
  if (chain.length < 2) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingVertical: space[1] }}>
      {chain.map((item, i) => {
        const current = item.id === id;
        return (
          <Fragment key={item.id}>
            {i > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 22, height: 3, backgroundColor: c.accent, borderRadius: 2 }} />
                <Ionicons name="caret-forward" size={14} color={c.accent} style={{ marginLeft: -4 }} />
              </View>
            )}
            <PressableScale
              disabled={current}
              accessibilityRole="button"
              accessibilityLabel={current ? `${item.shortTitle}, this case` : `Open ${item.shortTitle}`}
              onPress={() => router.push({ pathname: '/case/[id]', params: { id: item.id } })}
              style={{
                width: 150,
                padding: space[3],
                borderRadius: radius.md,
                borderWidth: current ? 2 : 1,
                borderColor: current ? c.accent : c.border,
                backgroundColor: current ? c.accentSoft : c.surface,
                gap: 2,
              }}
            >
              <Text variant="stamp" color="accent">
                {current ? `This case · ${item.year}` : String(item.year)}
              </Text>
              <Text variant="h3" style={{ fontSize: 15, lineHeight: 20 }} numberOfLines={2}>
                {item.shortTitle}
              </Text>
            </PressableScale>
          </Fragment>
        );
      })}
    </ScrollView>
  );
}
