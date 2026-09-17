import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { ScrollView, View, type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { space, useTheme } from '@/theme/useTheme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  /** Respect the top inset (off when a header already handles it). */
  top?: boolean;
  padded?: boolean;
  tone?: 'bg' | 'ink';
  footer?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  scrollProps?: ScrollViewProps;
};

export function Screen({ children, scroll = true, top = true, padded = true, tone = 'bg', footer, contentStyle, scrollProps }: Props) {
  const { c, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const bg = tone === 'ink' ? c.surfaceInk : c.bg;
  const pad: ViewStyle = {
    paddingTop: top ? insets.top + space[2] : space[2],
    paddingHorizontal: padded ? space[5] : 0,
    paddingBottom: footer ? space[6] : insets.bottom + space[10],
  };

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar style={tone === 'ink' || isDark ? 'light' : 'dark'} />
      {scroll ? (
        <ScrollView
          contentContainerStyle={[pad, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, pad, contentStyle]}>{children}</View>
      )}
      {footer && (
        <View
          style={{
            paddingHorizontal: space[5],
            paddingTop: space[3],
            paddingBottom: insets.bottom + space[3],
            backgroundColor: bg,
            borderTopWidth: 1,
            borderTopColor: c.border,
          }}
        >
          {footer}
        </View>
      )}
    </View>
  );
}
