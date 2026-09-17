import { router } from 'expo-router';

import { haptic } from '@/lib/haptics';
import { parseGlossary } from '@/lib/glossaryParser';
import type { TypeVariant } from '@/theme/tokens/type';
import { useTheme } from '@/theme/useTheme';

import { Text } from './Text';

/** Body text where [[terms]] get a highlighter treatment and open a plain-English definition. */
export function GlossaryText({ body, variant = 'body' }: { body: string; variant?: TypeVariant }) {
  const { c } = useTheme();
  return (
    <Text variant={variant} color="ink">
      {parseGlossary(body).map((seg, i) =>
        seg.kind === 'text' ? (
          seg.text
        ) : (
          <Text
            key={i}
            variant={variant}
            weight="semibold"
            accessibilityRole="link"
            accessibilityHint={`Shows the definition of ${seg.term}`}
            onPress={() => {
              haptic.light();
              router.push({ pathname: '/glossary/[term]', params: { term: seg.term } });
            }}
            style={{
              backgroundColor: c.highlightSoft,
              textDecorationLine: 'underline',
              textDecorationColor: c.highlight,
              textDecorationStyle: 'solid',
            }}
          >
            {seg.text}
          </Text>
        ),
      )}
    </Text>
  );
}
