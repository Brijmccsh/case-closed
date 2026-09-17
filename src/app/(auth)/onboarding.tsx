import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn as RFadeIn } from 'react-native-reanimated';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { FadeIn } from '@/components/FadeIn';
import { Logo } from '@/components/Logo';
import { PressableScale } from '@/components/PressableScale';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { haptic } from '@/lib/haptics';
import { useSession } from '@/state/SessionContext';
import { topicIds, type TopicId } from '@/theme/tokens/topics';
import { radius, space, useTheme } from '@/theme/useTheme';

export default function Onboarding() {
  const { user, setTopics, completeOnboarding } = useSession();
  const [picked, setPicked] = useState<TopicId[]>(user?.topics ?? []);
  const [phase, setPhase] = useState<'topics' | 'promise'>('topics');

  const toggle = (t: TopicId) => {
    haptic.tap();
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  };

  // The auth layout redirects to the tabs once onboarding is complete.
  const finish = () => completeOnboarding();

  if (phase === 'promise') {
    return (
      <Screen scroll={false} tone="ink" footer={<Button label="Open The Docket" full iconRight="arrow-forward" onPress={finish} />}>
        <Animated.View entering={RFadeIn.duration(400)} style={{ flex: 1, justifyContent: 'center', gap: space[6] }}>
          <Logo variant="mark" onInk height={56} style={{ alignSelf: 'flex-start' }} />
          <Text variant="stamp" style={{ color: '#FF9258' }}>
            Our promise
          </Text>
          <Text variant="display" color="onSurfaceInk">
            No spin. Original source on every case.
          </Text>
          <View style={{ gap: space[4] }}>
            <Promise icon="scale-outline" text="We explain what happened and what was decided. You decide what you think." />
            <Promise icon="link-outline" text="Every explainer links to the original ruling or bill." />
            <Promise icon="people-outline" text="Written and edited by student journalists, ages 14–19." />
          </View>
        </Animated.View>
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        <Button
          label={picked.length < 2 ? `Pick ${2 - picked.length} more` : 'Continue'}
          full
          disabled={picked.length < 2}
          iconRight="arrow-forward"
          onPress={() => {
            setTopics(picked);
            setPhase('promise');
          }}
        />
      }
    >
      <FadeIn>
        <Text variant="stamp" color="primaryText">{`Welcome, ${user?.name ?? 'there'}`}</Text>
        <Text variant="h1" style={{ marginTop: space[1] }}>
          What do you care about?
        </Text>
        <Text variant="body" color="inkMuted" style={{ marginTop: space[1], marginBottom: space[5] }}>
          Pick at least 2. We'll put those cases first.
        </Text>
      </FadeIn>
      <View style={{ gap: space[3] }}>
        {topicIds.map((t, i) => (
          <FadeIn key={t} index={i + 1}>
            <TopicOption id={t} selected={picked.includes(t)} onPress={() => toggle(t)} />
          </FadeIn>
        ))}
      </View>
    </Screen>
  );
}

function TopicOption({ id, selected, onPress }: { id: TopicId; selected: boolean; onPress: () => void }) {
  const { c, topic } = useTheme();
  const t = topic(id);
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: space[3],
        padding: space[3],
        borderRadius: radius.md,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? t.fg : c.border,
        backgroundColor: c.surface,
      }}
    >
      <View style={{ width: 44, height: 44, borderRadius: radius.sm, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={t.icon} size={22} color={t.fg} />
      </View>
      <Text variant="h3" style={{ flex: 1 }}>
        {t.label}
      </Text>
      <Ionicons name={selected ? 'checkmark-circle' : 'ellipse-outline'} size={26} color={selected ? t.fg : c.borderStrong} />
    </PressableScale>
  );
}

function Promise({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  const { c } = useTheme();
  return (
    <Card tone="ink" padded={false} style={{ flexDirection: 'row', gap: space[3], alignItems: 'center', shadowOpacity: 0 }}>
      <Ionicons name={icon} size={22} color={c.brand} />
      <Text variant="body" color="onSurfaceInk" style={{ flex: 1, opacity: 0.9 }}>
        {text}
      </Text>
    </Card>
  );
}
