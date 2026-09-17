import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import type { TopicId } from '@/theme/tokens/topics';
import { radius, space, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

export function TopicTag({ topic, size = 'sm' }: { topic: TopicId; size?: 'sm' | 'md' }) {
  const { topic: t } = useTheme();
  const tt = t(topic);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-start',
        backgroundColor: tt.bg,
        borderRadius: radius.pill,
        paddingHorizontal: size === 'sm' ? space[2] + 2 : space[3],
        paddingVertical: size === 'sm' ? 3 : 6,
      }}
    >
      <Ionicons name={tt.icon} size={size === 'sm' ? 12 : 15} color={tt.fg} />
      <Text variant="micro" style={{ color: tt.fg, fontSize: size === 'sm' ? 11 : 13 }} numberOfLines={1}>
        {tt.label}
      </Text>
    </View>
  );
}

/** Topic-colored case-file tile, used when an item has no cover image. */
export function TopicCover({ topic, label, size = 56 }: { topic: TopicId; label?: string; size?: number }) {
  const { topic: t } = useTheme();
  const tt = t(topic);
  return (
    <View
      style={{
        width: size,
        height: size * 1.15,
        borderRadius: radius.sm,
        backgroundColor: tt.bg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        borderTopWidth: 4,
        borderTopColor: tt.fg,
      }}
    >
      <Ionicons name={tt.icon} size={size * 0.4} color={tt.fg} />
      {label ? (
        <Text variant="stamp" style={{ color: tt.fg, fontSize: 10, letterSpacing: 1 }} numberOfLines={1}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}
