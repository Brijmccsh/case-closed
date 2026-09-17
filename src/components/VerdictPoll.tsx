import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, Easing } from 'react-native-reanimated';

import type { Poll, VoteChoice } from '@/data/types';
import { haptic } from '@/lib/haptics';
import { radius, space, useTheme } from '@/theme/useTheme';

import { PressableScale } from './PressableScale';
import { Text } from './Text';

const OPTIONS: { id: VoteChoice; label: string }[] = [
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
  { id: 'unsure', label: 'Not sure' },
];

/**
 * Nonpartisan by design: results stay hidden until you vote, your pick fills in `primary`,
 * every other option fills in neutral `pollNeutral` (never two opposing colors).
 */
export function VerdictPoll({ poll, vote, onVote }: { poll: Poll; vote?: VoteChoice; onVote: (v: VoteChoice) => void }) {
  return (
    <View style={{ gap: space[3] }}>
      {OPTIONS.map((o, i) => (
        <PollRow key={o.id} label={o.label} pct={poll.sample[o.id]} revealed={!!vote} mine={vote === o.id} index={i} onPress={() => {
          if (vote) return;
          haptic.success();
          onVote(o.id);
        }} />
      ))}
      <Text variant="micro" color="inkFaint" align="center">
        {vote ? 'Sample reader votes. There is no right answer here.' : 'Results appear after you vote.'}
      </Text>
    </View>
  );
}

function PollRow({ label, pct, revealed, mine, index, onPress }: { label: string; pct: number; revealed: boolean; mine: boolean; index: number; onPress: () => void }) {
  const { c } = useTheme();
  const w = useSharedValue(0);
  useEffect(() => {
    if (revealed) w.value = withDelay(150 + index * 120, withTiming(pct, { duration: 700, easing: Easing.out(Easing.cubic) }));
  }, [revealed, pct, index, w]);
  const bar = useAnimatedStyle(() => ({ width: `${w.value}%` }));

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={revealed ? `${label}, ${pct} percent${mine ? ', your vote' : ''}` : `Vote ${label}`}
      disabled={revealed}
      onPress={onPress}
      style={{
        height: 58,
        borderRadius: radius.md,
        borderWidth: mine ? 2 : 1,
        borderColor: mine ? c.primary : c.border,
        backgroundColor: c.surface,
        overflow: 'hidden',
        justifyContent: 'center',
      }}
    >
      <Animated.View
        style={[
          { position: 'absolute', top: 0, left: 0, bottom: 0, backgroundColor: mine ? c.primary : c.pollNeutral, opacity: mine ? 0.9 : 0.7 },
          bar,
        ]}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: space[4], gap: space[2] }}>
        {mine && <Ionicons name="checkmark-circle" size={20} color={pct >= 22 ? c.primaryOn : c.primaryText} />}
        <Text variant="bodyStrong" style={{ flex: 1, color: mine && pct >= 22 ? c.primaryOn : c.ink }}>
          {label}
        </Text>
        {revealed && (
          <Text variant="h2" style={{ fontSize: 22, color: mine && pct >= 88 ? c.primaryOn : mine ? c.primaryText : c.ink }}>
            {pct}%
          </Text>
        )}
      </View>
    </PressableScale>
  );
}
