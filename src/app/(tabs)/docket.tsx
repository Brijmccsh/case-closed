import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Card } from '@/components/Card';
import { DemoToolsSheet } from '@/components/DemoToolsSheet';
import { DocketCard } from '@/components/DocketCard';
import { Logo } from '@/components/Logo';
import { Screen } from '@/components/Screen';
import { SectionLabel } from '@/components/SectionLabel';
import { StatTile } from '@/components/StatTile';
import { Text } from '@/components/Text';
import { getCase, getItem } from '@/data/docket';
import { haptic } from '@/lib/haptics';
import { openBrief } from '@/lib/nav';
import { deriveStats } from '@/lib/stats';
import { useBriefs } from '@/state/BriefsContext';
import { useProgress } from '@/state/ProgressContext';
import { useSession } from '@/state/SessionContext';
import { space, useTheme } from '@/theme/useTheme';

export default function MyDocket() {
  const { c } = useTheme();
  const { user } = useSession();
  const { progress } = useProgress();
  const { briefs } = useBriefs();
  const [demo, setDemo] = useState(false);
  const stats = deriveStats(progress, briefs);

  const saved = progress.saved.map(getItem).filter((x) => !!x);
  const closed = Object.entries(progress.items)
    .filter(([, p]) => p.closedAt)
    .map(([id]) => getItem(id))
    .filter((x) => !!x);
  const finished = Object.values(briefs).filter((b) => b.status === 'done');

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable
          onLongPress={() => {
            haptic.thud();
            setDemo(true);
          }}
          delayLongPress={600}
          accessibilityLabel="Case Closed"
        >
          <Logo height={54} />
        </Pressable>
        <Pressable
          onPress={() => router.push('/profile')}
          accessibilityRole="button"
          accessibilityLabel="Settings and profile"
          hitSlop={10}
          style={{ width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
        >
          <Ionicons name="settings-outline" size={21} color={c.ink} />
        </Pressable>
      </View>

      <Text variant="stamp" color="inkMuted" style={{ marginTop: space[5] }}>
        My Docket
      </Text>
      <Text variant="h1">{`${user?.name ?? 'Your'}'s case file`}</Text>
      <Text variant="body" color="inkMuted">{`Grade ${user?.grade ?? 10}  ·  ${user?.state ?? ''}`}</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[3], marginTop: space[5] }}>
        <StatTile value={stats.casesClosed} label="Cases closed" icon="checkmark-done" />
        <StatTile value={stats.quizAccuracy === null ? '—' : `${stats.quizAccuracy}%`} label="Quiz accuracy" icon="school-outline" />
        <StatTile value={stats.verdictsCast} label="Verdicts cast" icon="hand-left-outline" />
        <StatTile value={stats.briefsWritten} label="Briefs written" icon="document-text-outline" />
      </View>
      <Card tone="soft" style={{ flexDirection: 'row', alignItems: 'center', gap: space[3], marginTop: space[3] }}>
        <Ionicons name="flame" size={26} color={c.brand} />
        <View style={{ flex: 1 }}>
          <Text variant="h3">{`${stats.streakDays}-day reading streak`}</Text>
          <Text variant="small" color="inkMuted">
            Read or close a case each day to keep it going.
          </Text>
        </View>
      </Card>

      <SectionLabel title="Saved for later" />
      {saved.length ? (
        <View style={{ gap: space[3] }}>{saved.map((s) => <DocketCard key={s.id} item={s} />)}</View>
      ) : (
        <Text variant="small" color="inkMuted">
          Tap the bookmark on any case to save it here.
        </Text>
      )}

      <SectionLabel title="Finished briefs" />
      {finished.length ? (
        <View style={{ gap: space[2] }}>
          {finished.map((b) => (
            <Card key={b.caseId} onPress={() => openBrief(b.caseId, true)} style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
              <Ionicons name="document-text" size={22} color={c.primaryText} />
              <Text variant="h3" style={{ flex: 1 }} numberOfLines={1}>
                {getCase(b.caseId)?.shortTitle}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={c.inkFaint} />
            </Card>
          ))}
        </View>
      ) : (
        <Text variant="small" color="inkMuted">
          Finish a brief in the Write tab and it'll be filed here.
        </Text>
      )}

      {closed.length > 0 && (
        <>
          <SectionLabel title="Closed cases" />
          <View style={{ gap: space[3] }}>{closed.map((s) => <DocketCard key={s.id} item={s} />)}</View>
        </>
      )}

      <SectionLabel title="Settings" />
      <Card onPress={() => router.push('/profile')} style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
        <Ionicons name="person-circle-outline" size={24} color={c.ink} />
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong">Profile & appearance</Text>
          <Text variant="small" color="inkMuted">
            Name, grade, state, dark mode
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={c.inkFaint} />
      </Card>

      <DemoToolsSheet visible={demo} onClose={() => setDemo(false)} />
    </Screen>
  );
}
