import { View } from 'react-native';

import { briefSteps } from '@/data/coach';
import type { Brief } from '@/state/BriefsContext';
import type { Case } from '@/data/types';
import { radius, shadow, space, useTheme } from '@/theme/useTheme';

import { CaseClosedStamp } from './CaseClosedStamp';
import { Logo } from './Logo';
import { Stamp } from './Stamp';
import { Text } from './Text';

/** Finished, shareable case brief. */
export function BriefCard({ brief, item, author, playStamp = true }: { brief: Brief; item: Case; author?: string; playStamp?: boolean }) {
  const { c, isDark } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: c.surface,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: c.border,
          overflow: 'hidden',
        },
        isDark ? null : shadow.md,
      ]}
    >
      <View style={{ backgroundColor: c.surfaceInk, padding: space[5], gap: space[1] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="stamp" color="onSurfaceInk" style={{ opacity: 0.8 }}>
            Case brief
          </Text>
          <Logo variant="mark" onInk height={22} />
        </View>
        <Text variant="h1" color="onSurfaceInk" style={{ fontSize: 28, lineHeight: 34 }}>
          {item.title}
        </Text>
        <Text variant="stamp" color="onSurfaceInk" style={{ opacity: 0.8 }}>
          {[item.courtStamp, item.year, item.vote].join('  ·  ')}
        </Text>
      </View>
      <View style={{ padding: space[5], gap: space[4] }}>
        {briefSteps.map((s, i) => (
          <View key={s.id} style={{ gap: 4 }}>
            <Stamp parts={[String(i + 1).padStart(2, '0'), s.label]} color="primaryText" />
            <Text variant="body" style={{ fontSize: 15, lineHeight: 22 }}>
              {brief.answers[s.id]?.trim() || '—'}
            </Text>
          </View>
        ))}
        <View style={{ height: 1, backgroundColor: c.border }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="micro" color="inkFaint">
            {author ? `Brief by ${author}` : 'Student brief'}
          </Text>
          <CaseClosedStamp size="sm" play={playStamp} delay={250} />
        </View>
      </View>
    </View>
  );
}

export function briefAsText(brief: Brief, item: Case, author?: string) {
  const parts = briefSteps.map((s) => `${s.label.toUpperCase()}\n${brief.answers[s.id]?.trim() || '—'}`);
  return [`CASE BRIEF: ${item.title} (${item.year}, ${item.vote})`, author ? `By ${author}` : '', '', parts.join('\n\n'), '', 'Made with Case Closed. Your rights, unredacted.']
    .filter((l, i) => l !== '' || i > 1)
    .join('\n');
}
