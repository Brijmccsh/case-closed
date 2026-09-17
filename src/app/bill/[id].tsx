import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DetailHeader, Disclaimer, KnowYourRights, SaveButton, SourceRow, TldrCard } from '@/components/DetailParts';
import { FadeIn } from '@/components/FadeIn';
import { NotFound } from '@/components/NotFound';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionBlock } from '@/components/SectionBlock';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusTracker } from '@/components/StatusTracker';
import { Text } from '@/components/Text';
import { getBill } from '@/data/docket';
import { useProgress } from '@/state/ProgressContext';
import { radius, space, useTheme } from '@/theme/useTheme';

export default function BillDetail() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getBill(id);
  const { markRead, item: progressOf } = useProgress();

  useEffect(() => {
    if (item) markRead(item.id);
  }, [item, markRead]);

  if (!item) return <NotFound />;
  const voted = !!progressOf(item.id).vote;

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScreenHeader title="Pending in Congress" right={<SaveButton id={item.id} />} />
      <Screen
        top={false}
        footer={
          <View style={{ flexDirection: 'row', gap: space[2] }}>
            {voted && (
              <Button label="Results" variant="secondary" icon="stats-chart" onPress={() => router.push({ pathname: '/case/[id]/verdict', params: { id: item.id } })} />
            )}
            <Button
              label="Test yourself"
              iconRight="arrow-forward"
              full
              style={{ flex: 1 }}
              onPress={() => router.push({ pathname: '/case/[id]/quiz', params: { id: item.id } })}
            />
          </View>
        }
      >
        <FadeIn index={0}>
          <DetailHeader item={item} />
        </FadeIn>

        <FadeIn index={1} style={{ marginTop: space[5] }}>
          <TldrCard text={item.tldr} />
        </FadeIn>

        <FadeIn index={2}>
          <Card style={{ marginTop: space[4], gap: space[4], padding: space[5] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="stamp" color="inkMuted">
                Status
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: c.accentSoft, paddingHorizontal: space[2], paddingVertical: 2, borderRadius: radius.pill }}>
                <Ionicons name="shield-checkmark-outline" size={13} color={c.accent} />
                <Text variant="micro" color="accent">{`Last verified ${item.lastVerified}`}</Text>
              </View>
            </View>
            <StatusTracker stages={item.stages} />
          </Card>
        </FadeIn>

        <View style={{ gap: space[4], marginTop: space[4] }}>
          {item.sections.map((s, i) => (
            <FadeIn key={s.key} index={i + 3}>
              <SectionBlock n={i + 1} title={s.title} body={s.body} />
            </FadeIn>
          ))}

          <SectionBlock n={item.sections.length + 1} title="What's being debated">
            <Text variant="body" color="inkMuted">
              {item.debate.intro}
            </Text>
            {/* Both sides get identical, neutral styling. No color coding. */}
            {item.debate.sides.map((side) => (
              <View key={side.label} style={{ gap: space[2], padding: space[4], borderRadius: radius.md, backgroundColor: c.surfaceAlt, borderWidth: 1, borderColor: c.border }}>
                <Text variant="stamp" color="ink">
                  {side.label}
                </Text>
                {side.points.map((p) => (
                  <View key={p} style={{ flexDirection: 'row', gap: space[2] }}>
                    <Text variant="body" color="inkFaint">
                      •
                    </Text>
                    <Text variant="body" style={{ flex: 1 }}>
                      {p}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </SectionBlock>

          <SectionBlock n={item.sections.length + 2} title="Know your rights">
            <KnowYourRights items={item.knowYourRights} />
          </SectionBlock>
        </View>

        <SectionLabel title="Sources" />
        <View style={{ gap: space[2] }}>
          <SourceRow url={item.sourceUrl} label={item.sourceLabel} />
          {item.extraSources.map((s) => (
            <SourceRow key={s.url} url={s.url} label={s.label} title="Track the Senate bill" />
          ))}
        </View>
        <Disclaimer />
      </Screen>
    </View>
  );
}
