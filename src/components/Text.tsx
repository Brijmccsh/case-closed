import { StyleSheet, Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import type { Palette } from '@/theme/tokens/colors.dark';
import { type as scale, weights, type TypeVariant, type Weight } from '@/theme/tokens/type';
import { useTheme } from '@/theme/useTheme';

export type TextProps = RNTextProps & {
  variant?: TypeVariant;
  /** Overrides the variant's font family only (e.g. quoteItalic). Not a type-scale variant. */
  weight?: Weight;
  color?: keyof Palette;
  align?: TextStyle['textAlign'];
};

export function Text({ variant = 'body', weight, color = 'ink', align, style, ...rest }: TextProps) {
  const { c } = useTheme();
  const v = scale[variant];
  const flat = StyleSheet.flatten(style) ?? {};
  const fontSize = flat.fontSize ?? v.size;
  // Clip rule: tall condensed caps clip unless lineHeight >= fontSize * 1.28.
  const lineHeight = Math.max(flat.lineHeight ?? (fontSize === v.size ? v.lineHeight : 0), Math.ceil(fontSize * 1.28));

  return (
    <RNText
      {...rest}
      style={[
        {
          fontFamily: weight ? weights[weight] : v.family,
          fontSize: v.size,
          color: c[color],
          letterSpacing: 'letterSpacing' in v ? v.letterSpacing : undefined,
          textTransform: 'uppercase' in v && v.uppercase ? 'uppercase' : undefined,
          textAlign: align,
        },
        style,
        { lineHeight },
      ]}
    />
  );
}
