import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import type { BillStage } from '@/data/types';
import { space, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

export function StatusTracker({ stages, compact }: { stages: BillStage[]; compact?: boolean }) {
  const { c } = useTheme();
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.5, { duration: 1100 }), -1, true);
  }, [pulse]);
  const ring = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }], opacity: 1.6 - pulse.value }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      {stages.map((s, i) => {
        const done = s.state === 'done';
        const current = s.state === 'current';
        const dot = compact ? 18 : 24;
        return (
          <View key={s.label} style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>
              <View style={{ flex: 1, height: 2, backgroundColor: i === 0 ? 'transparent' : done || current ? c.accent : c.border }} />
              <View style={{ width: dot, height: dot, alignItems: 'center', justifyContent: 'center' }}>
                {current && (
                  <Animated.View
                    style={[{ position: 'absolute', width: dot, height: dot, borderRadius: dot / 2, backgroundColor: c.brand }, ring]}
                  />
                )}
                <View
                  style={{
                    width: dot,
                    height: dot,
                    borderRadius: dot / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: done ? c.accent : current ? c.brand : c.surface,
                    borderWidth: done || current ? 0 : 2,
                    borderColor: c.borderStrong,
                  }}
                >
                  {done && <Ionicons name="checkmark" size={dot * 0.6} color={c.surface} />}
                  {current && <View style={{ width: dot * 0.3, height: dot * 0.3, borderRadius: 99, backgroundColor: c.surface }} />}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: i === stages.length - 1 ? 'transparent' : done ? c.accent : c.border,
                }}
              />
            </View>
            <Text variant="micro" color={current ? 'ink' : done ? 'inkMuted' : 'inkFaint'} align="center" style={{ marginTop: space[1] }} numberOfLines={2}>
              {s.label}
            </Text>
            {!compact && s.detail ? (
              <Text variant="micro" color={current ? 'primaryText' : 'inkFaint'} align="center" style={{ fontSize: 10 }}>
                {s.detail}
              </Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
