import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { radius, space, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

export type ChatMessage = { id: string; from: 'coach' | 'student'; text: string; tag?: string };

export function CoachBubble({ msg }: { msg: ChatMessage }) {
  const { c } = useTheme();
  const coach = msg.from === 'coach';
  return (
    <Animated.View
      entering={FadeInUp.duration(320)}
      style={{ flexDirection: 'row', gap: space[2], justifyContent: coach ? 'flex-start' : 'flex-end', alignItems: 'flex-end' }}
    >
      {coach && <CoachAvatar />}
      <View
        style={{
          maxWidth: '82%',
          paddingHorizontal: space[4],
          paddingVertical: space[3],
          borderRadius: radius.lg,
          borderBottomLeftRadius: coach ? 6 : radius.lg,
          borderBottomRightRadius: coach ? radius.lg : 6,
          backgroundColor: coach ? c.surface : c.surfaceInk,
          borderWidth: coach ? 1 : 0,
          borderColor: c.border,
          gap: 2,
        }}
      >
        {coach && msg.tag ? (
          <Text variant="stamp" color="accent" style={{ fontSize: 11 }}>
            {msg.tag}
          </Text>
        ) : null}
        <Text variant="body" style={{ color: coach ? c.ink : c.onSurfaceInk, fontSize: 15, lineHeight: 22 }}>
          {msg.text}
        </Text>
      </View>
    </Animated.View>
  );
}

export function CoachAvatar() {
  const { c } = useTheme();
  return (
    <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name="bulb-outline" size={17} color="#FFFFFF" />
    </View>
  );
}

/** Shimmering "thinking" placeholder shown before each Coach reply. */
export function CoachThinking() {
  const { c } = useTheme();
  const t = useSharedValue(0.35);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 650 }), -1, true);
  }, [t]);
  const a = useAnimatedStyle(() => ({ opacity: t.value }));
  const b = useAnimatedStyle(() => ({ opacity: 1.35 - t.value }));
  return (
    <Animated.View entering={FadeInUp.duration(200)} style={{ flexDirection: 'row', gap: space[2], alignItems: 'flex-end' }}>
      <CoachAvatar />
      <View
        style={{
          width: 190,
          padding: space[3],
          borderRadius: radius.lg,
          borderBottomLeftRadius: 6,
          backgroundColor: c.surface,
          borderWidth: 1,
          borderColor: c.border,
          gap: 7,
        }}
      >
        <Animated.View style={[{ height: 9, width: '90%', borderRadius: 5, backgroundColor: c.accentSoft }, a]} />
        <Animated.View style={[{ height: 9, width: '60%', borderRadius: 5, backgroundColor: c.accentSoft }, b]} />
      </View>
    </Animated.View>
  );
}
