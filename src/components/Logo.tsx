import { Image } from 'expo-image';
import type { StyleProp, ImageStyle } from 'react-native';

import { useTheme } from '@/theme/useTheme';

const src = {
  full: require('../../assets/logo.png'),
  fullDark: require('../../assets/logo-dark.png'),
  mark: require('../../assets/logo-mobile.png'),
  markDark: require('../../assets/logo-mobile-dark.png'),
};

type Props = {
  variant?: 'full' | 'mark';
  /** Force the cream version (e.g. on navy bands) regardless of theme. */
  onInk?: boolean;
  height: number;
  style?: StyleProp<ImageStyle>;
};

export function Logo({ variant = 'full', onInk, height, style }: Props) {
  const { isDark } = useTheme();
  const dark = onInk || isDark;
  const source = variant === 'full' ? (dark ? src.fullDark : src.full) : dark ? src.markDark : src.mark;
  const aspectRatio = variant === 'full' ? 1200 / 798 : 640 / 375;
  return (
    <Image
      source={source}
      style={[{ height, aspectRatio }, style]}
      contentFit="contain"
      accessibilityLabel="Case Closed"
      transition={150}
    />
  );
}
