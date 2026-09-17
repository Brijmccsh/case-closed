import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { NotFound } from '@/components/NotFound';
import { Card } from '@/components/Card';
import { DetailHeader, Disclaimer, KnowYourRights, SaveButton, SourceRow, TldrCard } from '@/components/DetailParts';
import { FadeIn } from '@/components/FadeIn';
import { PrecedentChain } from '@/components/PrecedentChain';
import { PullQuote } from '@/components/PullQuote';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionBlock } from '@/components/SectionBlock';
import { SectionLabel } from '@/components/SectionLabel';
import { Text } from '@/components/Text';
import { getCase } from '@/data/docket';
import { openBrief } from '@/lib/nav';
import { useBriefs } from '@/state/BriefsContext';
import { useProgress } from '@/state/ProgressContext';
import { space, useTheme } from '@/theme/useTheme';

export default function CaseDetail() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getCase(id);
  const { markRead, isClosed } = useProgress();
  const { get } = useBriefs();

  useEffect(() => {
    if (item) markRead(item.id);
  }, [item, markRead]);

  if (!item) return <NotFound />;
  const closed = isClosed(item.id);
  const brief = get(item.id);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScreenHeader title={item.kind === 'case' ? 'Case file' : 'Bill'} right={<SaveButton id={item.id} />} />
      <Screen
        top={false}
        footer={
          <View style={{ flexDirection: 'row', gap: space[2] }}>
            {closed && (
              <Button
                label="Results"
                variant="secondary"
                icon="stats-chart"
                onPress={() => router.push({ pathname: '/case/[id]/verdict', params: { id: item.id } })}
              />
            )}
            <Button
              label={closed ? 'Retake the quiz' : 'Test yourself'}
              iconRight="arrow-forward"
              style={{ flex: 1 }}
              full
              onPress={() => router.push({ pathname: '/case/[id]/quiz', params: { id: item.id } })}
            />
          </View>
        }
      >
        <FadeIn index={0}>
          <DetailHeader item={item} />
        </FadeIn>
        {closed && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: space[3] }}>
            <Ionicons name="checkmark-circle" size={18} color={c.accent} />
            <Text variant="small" color="accent">
              You closed this case
            </Text>
          </View>
        )}
        <FadeIn index={1} style={{ marginTop: space[5] }}>
          <TldrCard text={item.tldr} />
        </FadeIn>

        <View style={{ gap: space[4], marginTop: space[4] }}>
          {item.sections.map((s, i) => (
            <FadeIn key={s.key} index={i + 2}>
              <SectionBlock n={i + 1} title={s.title} body={s.body}>
                {s.key === 'decided' && item.pullQuote ? <PullQuote quote={item.pullQuote} /> : null}
                {s.key === 'decided' && item.note && !s.body.includes('2025') ? (
                  <Text variant="small" color="inkMuted">
                    {item.note}
                  </Text>
                ) : null}
              </SectionBlock>
            </FadeIn>
          ))}
          <SectionBlock n={item.sections.length + 1} title="Know your rights">
            <KnowYourRights items={item.knowYourRights} />
          </SectionBlock>
        </View>

        <SectionLabel title="Source" />
        <SourceRow url={item.sourceUrl} label={item.sourceLabel} />

        {item.precedents.before.length + item.precedents.after.length > 0 && (
          <>
            <SectionLabel title="Precedent chain" />
            <Card style={{ gap: space[3] }}>
              <Text variant="small" color="inkMuted">
                Courts build on earlier rulings. Tap a case to follow the chain.
              </Text>
              <PrecedentChain id={item.id} before={item.precedents.before} after={item.precedents.after} />
            </Card>
          </>
        )}

        {item.briefable && (
          <>
            <SectionLabel title="Write a Case" />
            <Card tone="ink" onPress={() => openBrief(item.id, brief?.status === 'done')} style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
              <Ionicons name="create-outline" size={24} color={c.brand} />
              <View style={{ flex: 1 }}>
                <Text variant="h3" color="onSurfaceInk">
                  {brief?.status === 'done' ? 'View your brief' : brief ? 'Continue your brief' : 'Brief this case with Coach'}
                </Text>
                <Text variant="small" color="onSurfaceInk" style={{ opacity: 0.75 }}>
                  Facts → Question → Holding → Reasoning → Why it matters
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color={c.onSurfaceInk} />
            </Card>
          </>
        )}
        <Disclaimer />
      </Screen>
    </View>
  );
}
