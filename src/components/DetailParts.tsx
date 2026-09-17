import { Ionicons } from '@expo/vector-icons';
import { Linking, View } from 'react-native';

import type { DocketItem } from '@/data/types';
import { domainOf } from '@/lib/url';
import { useProgress } from '@/state/ProgressContext';
import { radius, space, useTheme } from '@/theme/useTheme';

import { Card } from './Card';
import { GlossaryText } from './GlossaryText';
import { IconButton } from './ScreenHeader';
import { Stamp } from './Stamp';
import { Text } from './Text';
import { TopicTag } from './TopicTag';
import { haptic } from '@/lib/haptics';

/** Stamp row, topic tag, title, byline, read time. Shared by case + bill detail. */
export function DetailHeader({ item }: { item: DocketItem }) {
  return (
    <View style={{ gap: space[2] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2], flexWrap: 'wrap' }}>
        <Stamp parts={[item.courtStamp, item.year, item.status]} color="primaryText" />
        <TopicTag topic={item.topic} />
      </View>
      <Text variant="h1">{item.title}</Text>
      <Text variant="small" color="inkMuted">
        <Text variant="small" weight="semibold" color="ink">{`Written by ${item.byline}`}</Text>
        {`  ·  Edited by ${item.editedBy}  ·  ${item.readMinutes} min read`}
      </Text>
    </View>
  );
}

export function SaveButton({ id }: { id: string }) {
  const { isSaved, toggleSave } = useProgress();
  const saved = isSaved(id);
  return (
    <IconButton
      icon={saved ? 'bookmark' : 'bookmark-outline'}
      label={saved ? 'Remove from saved' : 'Save for later'}
      active={saved}
      onPress={() => {
        haptic.light();
        toggleSave(id);
      }}
    />
  );
}

export function TldrCard({ text }: { text: string }) {
  return (
    <Card tone="soft" style={{ gap: space[1], padding: space[5] }}>
      <Text variant="stamp" color="primaryText">
        TL;DR
      </Text>
      <GlossaryText body={text} variant="bodyStrong" />
    </Card>
  );
}

export function KnowYourRights({ items }: { items: string[] }) {
  const { c } = useTheme();
  return (
    <View style={{ gap: space[3] }}>
      {items.map((r) => (
        <View key={r} style={{ flexDirection: 'row', gap: space[3] }}>
          <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: c.accentSoft, alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
            <Ionicons name="checkmark" size={16} color={c.accent} />
          </View>
          <Text variant="body" style={{ flex: 1 }}>
            {r}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function SourceRow({ url, label, title = 'Read the original' }: { url: string; label: string; title?: string }) {
  const { c } = useTheme();
  return (
    <Card
      onPress={() => {
        haptic.light();
        Linking.openURL(url).catch(() => {});
      }}
      accessibilityLabel={`${title}: ${label}. Opens ${domainOf(url)}`}
      style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}
    >
      <View style={{ width: 44, height: 44, borderRadius: radius.sm, backgroundColor: c.surfaceAlt, borderWidth: 1, borderColor: c.border, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="document-attach-outline" size={22} color={c.ink} />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong">{title}</Text>
        <Text variant="small" color="inkMuted" numberOfLines={1}>
          {label}
        </Text>
        <Text variant="micro" color="primaryText">
          {domainOf(url)}
        </Text>
      </View>
      <Ionicons name="open-outline" size={20} color={c.inkMuted} />
    </Card>
  );
}

export function Disclaimer() {
  return (
    <Text variant="micro" color="inkFaint" align="center" style={{ marginTop: space[6] }}>
      Case Closed is an educational resource, not legal advice.
    </Text>
  );
}
