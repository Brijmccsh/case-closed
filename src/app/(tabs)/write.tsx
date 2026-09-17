import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Card } from '@/components/Card';
import { CoachAvatar } from '@/components/CoachBubble';
import { FadeIn } from '@/components/FadeIn';
import { Screen } from '@/components/Screen';
import { SectionLabel } from '@/components/SectionLabel';
import { Stamp } from '@/components/Stamp';
import { Text } from '@/components/Text';
import { TopicCover } from '@/components/TopicTag';
import { briefSteps } from '@/data/coach';
import { briefableCases, getCase } from '@/data/docket';
import { openBrief } from '@/lib/nav';
import { useBriefs } from '@/state/BriefsContext';
import { radius, space, useTheme } from '@/theme/useTheme';

export default function Write() {
  const { c } = useTheme();
  const { briefs } = useBriefs();
  const all = Object.values(briefs).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const drafts = all.filter((b) => b.status === 'draft');
  const done = all.filter((b) => b.status === 'done');

  return (
    <Screen>
      <Text variant="stamp" color="inkMuted">
        Write a Case
      </Text>
      <Text variant="h1">Brief it like a law student.</Text>

      <FadeIn index={0}>
        <Card tone="ink" style={{ marginTop: space[4], gap: space[3], padding: space[5] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
            <CoachAvatar />
            <Text variant="h3" color="onSurfaceInk">
              Meet your Coach
            </Text>
          </View>
          <Text variant="body" color="onSurfaceInk" style={{ opacity: 0.88 }}>
            Build a case brief one step at a time. The Coach asks guiding questions and nudges you when you're stuck. It
            never hands over the answer.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {briefSteps.map((s, i) => (
              <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text variant="stamp" color="onSurfaceInk" style={{ opacity: 0.75, fontSize: 12 }}>
                  {s.label}
                </Text>
                {i < briefSteps.length - 1 && <Ionicons name="arrow-forward" size={12} color={c.brand} />}
              </View>
            ))}
          </View>
        </Card>
      </FadeIn>

      <SectionLabel title="Pick a case to brief" />
      <View style={{ gap: space[3] }}>
        {briefableCases.map((item, i) => {
          const b = briefs[item.id];
          const status = !b ? 'Not started' : b.status === 'done' ? 'Finished' : `Step ${b.stepIndex + 1} of ${briefSteps.length}`;
          return (
            <FadeIn key={item.id} index={i + 1}>
              <Card
                onPress={() => openBrief(item.id, b?.status === 'done')}
                accessibilityLabel={`Brief ${item.shortTitle}. ${status}`}
                style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}
              >
                <TopicCover topic={item.topic} label={String(item.year)} size={48} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Stamp parts={[item.courtStamp, item.year, item.vote]} />
                  <Text variant="h2" style={{ fontSize: 21 }} numberOfLines={1}>
                    {`Brief ${item.nickname}`}
                  </Text>
                  <Text variant="micro" color={b?.status === 'done' ? 'accent' : b ? 'primaryText' : 'inkFaint'}>
                    {status}
                  </Text>
                </View>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: c.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={b?.status === 'done' ? 'document-text' : 'create'} size={18} color={c.primaryText} />
                </View>
              </Card>
            </FadeIn>
          );
        })}
      </View>

      {drafts.length > 0 && (
        <>
          <SectionLabel title="In progress" />
          <View style={{ gap: space[2] }}>
            {drafts.map((b) => (
              <BriefRow key={b.caseId} caseId={b.caseId} subtitle={`Step ${b.stepIndex + 1} of ${briefSteps.length} · ${briefSteps[b.stepIndex].label}`} progress={(b.stepIndex + 1) / briefSteps.length} onPress={() => openBrief(b.caseId, false)} />
            ))}
          </View>
        </>
      )}

      <SectionLabel title="Finished briefs" />
      {done.length ? (
        <View style={{ gap: space[2] }}>
          {done.map((b) => (
            <BriefRow key={b.caseId} caseId={b.caseId} subtitle="Case closed · tap to view or share" progress={1} onPress={() => openBrief(b.caseId, true)} />
          ))}
        </View>
      ) : (
        <Card tone="alt" style={{ alignItems: 'center', gap: space[1], paddingVertical: space[6], borderStyle: 'dashed', borderColor: c.borderStrong }}>
          <Ionicons name="document-outline" size={26} color={c.inkFaint} />
          <Text variant="small" color="inkMuted" align="center">
            Your finished briefs will be filed here.
          </Text>
        </Card>
      )}
    </Screen>
  );
}

function BriefRow({ caseId, subtitle, progress, onPress }: { caseId: string; subtitle: string; progress: number; onPress: () => void }) {
  const { c } = useTheme();
  const item = getCase(caseId);
  if (!item) return null;
  return (
    <Card onPress={onPress} style={{ gap: space[2] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>
            {item.shortTitle}
          </Text>
          <Text variant="small" color="inkMuted">
            {subtitle}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={c.inkFaint} />
      </View>
      <View style={{ height: 4, borderRadius: radius.pill, backgroundColor: c.border, overflow: 'hidden' }}>
        <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: progress === 1 ? c.accent : c.brand }} />
      </View>
    </Card>
  );
}
