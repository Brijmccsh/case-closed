import { useEffect } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

import { haptic } from '@/lib/haptics';
import { radius, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

type Props = { play?: boolean; delay?: number; size?: 'lg' | 'sm'; style?: StyleProp<ViewStyle>; label?: string };

/** The "CASE CLOSED" rubber stamp: scale 1.3 → 1, slight rotate, haptic thud on landing. */
export function CaseClosedStamp({ play = true, delay = 0, size = 'lg', style, label = 'Case Closed' }: Props) {
  const { c } = useTheme();
  const scale = useSharedValue(play ? 1.3 : 1);
  const opacity = useSharedValue(play ? 0 : 1);

  useEffect(() => {
    if (!play) return;
    opacity.value = withDelay(delay, withTiming(1, { duration: 120 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 9, stiffness: 220, mass: 0.7 }));
    const t = setTimeout(() => haptic.thud(), delay + 140);
    return () => clearTimeout(t);
  }, [play, delay, opacity, scale]);

  const anim = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }, { rotate: '-8deg' }] }));
  const lg = size === 'lg';

  return (
    <Animated.View style={[{ alignSelf: 'center' }, anim, style]} accessibilityLabel={label}>
      <View
        style={{
          borderWidth: lg ? 4 : 2.5,
          borderColor: c.brand,
          borderRadius: radius.sm,
          paddingHorizontal: lg ? 18 : 10,
          paddingVertical: lg ? 4 : 1,
        }}
      >
        <View style={{ borderWidth: 1.5, borderColor: c.brand, borderRadius: 6, paddingHorizontal: lg ? 12 : 6 }}>
          <Text variant="display" style={{ color: c.brand, fontSize: lg ? 40 : 20, letterSpacing: lg ? 4 : 2, textTransform: 'uppercase' }}>
            {label}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
