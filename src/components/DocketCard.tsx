import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View } from 'react-native';

import type { DocketItem } from '@/data/types';
import { stripGlossary } from '@/lib/glossaryParser';
import { useProgress } from '@/state/ProgressContext';
import { radius, space, useTheme } from '@/theme/useTheme';

import { Card } from './Card';
import { Stamp } from './Stamp';
import { Text } from './Text';
import { TopicCover, TopicTag } from './TopicTag';

export function openItem(item: DocketItem) {
  if (item.kind === 'bill') router.push({ pathname: '/bill/[id]', params: { id: item.id } });
  else router.push({ pathname: '/case/[id]', params: { id: item.id } });
}

export function DocketCard({ item }: { item: DocketItem }) {
  const { c } = useTheme();
  const { isClosed } = useProgress();
  const closed = isClosed(item.id);
  return (
    <Card onPress={() => openItem(item)} accessibilityLabel={`${item.title}. ${item.readMinutes} minute read`} style={{ gap: space[3] }}>
      <View style={{ flexDirection: 'row', gap: space[3] }}>
        {item.coverImage ? null : <TopicCover topic={item.topic} label={String(item.year)} size={52} />}
        <View style={{ flex: 1, gap: 4 }}>
          <Stamp parts={[item.courtStamp, item.year, item.status]} />
          <Text variant="h2" style={{ fontSize: 22 }} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </View>
      <Text variant="small" color="inkMuted" numberOfLines={2} style={{ fontFamily: 'PublicSans_400Regular' }}>
        {stripGlossary(item.tldr)}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
        <TopicTag topic={item.topic} />
        <Text variant="micro" color="inkFaint">
          {item.readMinutes} min read
        </Text>
        <View style={{ flex: 1 }} />
        {closed ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: space[2],
              paddingVertical: 2,
              borderRadius: radius.pill,
              backgroundColor: c.accentSoft,
            }}
          >
            <Ionicons name="checkmark-circle" size={14} color={c.accent} />
            <Text variant="micro" color="accent">
              Closed
            </Text>
          </View>
        ) : (
          <Ionicons name="arrow-forward" size={18} color={c.inkFaint} />
        )}
      </View>
    </Card>
  );
}
