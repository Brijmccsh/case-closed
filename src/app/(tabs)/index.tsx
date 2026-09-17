import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Chip } from '@/components/Chip';
import { DocketCard, openItem } from '@/components/DocketCard';
import { FadeIn } from '@/components/FadeIn';
import { Logo } from '@/components/Logo';
import { PressableScale } from '@/components/PressableScale';
import { Screen } from '@/components/Screen';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusTracker } from '@/components/StatusTracker';
import { Text } from '@/components/Text';
import { TopicTag } from '@/components/TopicTag';
import { bills, FEATURED_CASE_ID, getCase, latestRulings } from '@/data/docket';
import { deriveStats } from '@/lib/stats';
import { useBriefs } from '@/state/BriefsContext';
import { useProgress } from '@/state/ProgressContext';
import { useSession } from '@/state/SessionContext';
import type { TopicId } from '@/theme/tokens/topics';
import { radius, shadow, space, useTheme } from '@/theme/useTheme';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function Home() {
  const { c, topic } = useTheme();
  const { user } = useSession();
  const { progress } = useProgress();
  const { briefs } = useBriefs();
  const stats = deriveStats(progress, briefs);
  const [filter, setFilter] = useState<TopicId | null>(null);
  const featured = getCase(FEATURED_CASE_ID)!;

  const rulings = useMemo(() => {
    const list = latestRulings.filter((r) => r.id !== FEATURED_CASE_ID);
    if (filter) return list.filter((r) => r.topic === filter);
    const mine = user?.topics ?? [];
    return [...list].sort((a, b) => Number(mine.includes(b.topic)) - Number(mine.includes(a.topic)));
  }, [filter, user?.topics]);

  return (
    <Screen>
      <FadeIn index={0} style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
        <Logo variant="mark" height={30} />
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: space[3], height: 34, borderRadius: radius.pill, backgroundColor: c.primarySoft }}>
          <Ionicons name="flame" size={16} color={c.brand} />
          <Text variant="small" weight="bold" color="primaryText">{`${stats.streakDays}-day streak`}</Text>
        </View>
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel="Profile"
          onPress={() => router.push('/profile')}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: c.ink, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text variant="stamp" style={{ color: c.bg, letterSpacing: 0, fontSize: 16 }}>
            {(user?.name ?? 'A').slice(0, 1)}
          </Text>
        </PressableScale>
      </FadeIn>

      <FadeIn index={1} style={{ marginTop: space[5], gap: 2 }}>
        <Text variant="stamp" color="inkMuted">{`The Docket  ·  Your state: ${user?.state ?? 'Virginia'}`}</Text>
        <Text variant="h1">{`${greeting()}, ${user?.name ?? 'there'}.`}</Text>
        <Text variant="body" color="inkMuted">
          {stats.casesClosed === 1 ? '1 case closed so far. ' : `${stats.casesClosed} cases closed so far. `}
          Here's what's on the docket.
        </Text>
      </FadeIn>

      <FadeIn index={2} style={{ marginTop: space[5] }}>
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={`Featured case: ${featured.title}`}
          onPress={() => openItem(featured)}
          style={[{ backgroundColor: c.surfaceInk, borderRadius: radius.lg, padding: space[5], gap: space[3], overflow: 'hidden' }, shadow.md]}
        >
          <View style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: 70, borderWidth: 18, borderColor: c.brand, opacity: 0.18 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
            <View style={{ backgroundColor: c.brand, borderRadius: radius.xs, paddingHorizontal: 8, paddingVertical: 2 }}>
              <Text variant="stamp" style={{ color: '#FFFFFF', fontSize: 12 }}>
                Featured
              </Text>
            </View>
            <Text variant="stamp" color="onSurfaceInk" style={{ opacity: 0.75 }}>
              {[featured.courtStamp, featured.year, featured.vote].join('  ·  ')}
            </Text>
          </View>
          <Text variant="h1" color="onSurfaceInk">
            {featured.title}
          </Text>
          <View style={{ borderLeftWidth: 3, borderLeftColor: c.brand, paddingLeft: space[3] }}>
            <Text variant="stamp" style={{ color: '#FF9258', fontSize: 12 }}>
              TL;DR
            </Text>
            <Text variant="body" color="onSurfaceInk" style={{ opacity: 0.9 }}>
              {featured.tldr}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: space[1] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name={topic(featured.topic).icon} size={15} color="#FF9258" />
              <Text variant="micro" color="onSurfaceInk" style={{ opacity: 0.8 }}>{`${topic(featured.topic).label}  ·  ${featured.readMinutes} min read`}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text variant="small" weight="bold" style={{ color: '#FF9258' }}>
                Read the case
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#FF9258" />
            </View>
          </View>
        </PressableScale>
      </FadeIn>

      <FadeIn index={3}>
        <SectionLabel title="Pending in Congress" />
        {bills.map((b) => (
          <PressableScale
            key={b.id}
            accessibilityRole="button"
            accessibilityLabel={b.title}
            onPress={() => openItem(b)}
            style={{ backgroundColor: c.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: c.border, padding: space[4], gap: space[3] }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TopicTag topic={b.topic} />
              <Text variant="micro" color="inkFaint">{`Verified ${b.lastVerified}`}</Text>
            </View>
            <Text variant="h2">{b.shortTitle}</Text>
            <Text variant="small" color="inkMuted" numberOfLines={2} style={{ fontFamily: 'PublicSans_400Regular' }}>
              {b.tldr}
            </Text>
            <StatusTracker stages={b.stages} compact />
          </PressableScale>
        ))}
      </FadeIn>

      <FadeIn index={4}>
        <SectionLabel title="Latest rulings" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -space[5], marginBottom: space[3] }} contentContainerStyle={{ gap: space[2], paddingHorizontal: space[5] }}>
          <Chip label="For you" selected={filter === null} onPress={() => setFilter(null)} icon="sparkles-outline" />
          {(user?.topics ?? []).map((t) => (
            <Chip key={t} label={topic(t).label} icon={topic(t).icon} selected={filter === t} onPress={() => setFilter(filter === t ? null : t)} />
          ))}
        </ScrollView>
        <View style={{ gap: space[3] }}>
          {rulings.length ? (
            rulings.map((r) => <DocketCard key={r.id} item={r} />)
          ) : (
            <Text variant="body" color="inkMuted" align="center" style={{ paddingVertical: space[6] }}>
              The featured case above is the latest in this topic. More in Explore.
            </Text>
          )}
        </View>
      </FadeIn>
    </Screen>
  );
}
