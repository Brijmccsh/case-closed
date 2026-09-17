import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Share, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { BriefCard, briefAsText } from '@/components/BriefCard';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { NotFound } from '@/components/NotFound';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Stamp } from '@/components/Stamp';
import { Text } from '@/components/Text';
import { briefSteps } from '@/data/coach';
import { getCase } from '@/data/docket';
import { courtAnswer } from '@/lib/coachEngine';
import { haptic } from '@/lib/haptics';
import { useBriefs } from '@/state/BriefsContext';
import { useSession } from '@/state/SessionContext';
import { radius, space, useTheme } from '@/theme/useTheme';

export default function BriefDone() {
  const { c } = useTheme();
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const item = getCase(caseId);
  const { get, setStep, briefs } = useBriefs();
  const { user } = useSession();
  const brief = get(caseId);
  const [compare, setCompare] = useState(false);

  if (!item || !brief) return <NotFound />;

  const toWriteTab = () => {
    router.dismissTo('/write');
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScreenHeader title="Brief filed" onBack={toWriteTab} icon="close" />
      <Screen top={false}>
        <Text variant="stamp" color="primaryText">
          {`Brief ${Object.values(briefs).filter((b) => b.status === 'done').length} complete`}
        </Text>
        <Text variant="h1" style={{ marginBottom: space[4] }}>
          You briefed a Supreme Court case.
        </Text>

        <BriefCard brief={brief} item={item} author={user?.name} />

        <View style={{ gap: space[3], marginTop: space[5] }}>
          <Button
            label="Share brief"
            icon="share-outline"
            full
            onPress={() => {
              haptic.light();
              Share.share({ message: briefAsText(brief, item, user?.name) }).catch(() => {});
            }}
          />
          <Button
            label={compare ? 'Hide the court’s version' : 'Compare with the court'}
            icon="git-compare-outline"
            variant="secondary"
            full
            onPress={() => setCompare((v) => !v)}
          />
        </View>

        {compare && (
          <Animated.View entering={FadeInDown.duration(350)} style={{ gap: space[3], marginTop: space[5] }}>
            <Text variant="body" color="inkMuted">
              Line yours up against the court's record. Close counts: briefs are in your own words.
            </Text>
            {briefSteps.map((s, i) => (
              <Card key={s.id} style={{ gap: space[3] }}>
                <Stamp parts={[String(i + 1).padStart(2, '0'), s.label]} color="primaryText" />
                <View style={{ gap: 4 }}>
                  <Text variant="micro" color="inkFaint">
                    YOU WROTE
                  </Text>
                  <Text variant="body" style={{ fontSize: 15, lineHeight: 22 }}>
                    {brief.answers[s.id]?.trim() || '—'}
                  </Text>
                </View>
                <View style={{ gap: 4, padding: space[3], borderRadius: radius.sm, backgroundColor: c.accentSoft }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="library-outline" size={13} color={c.accent} />
                    <Text variant="micro" color="accent">
                      {s.id === 'matters' ? 'WHAT IT MEANS, PER THE RULING' : 'THE COURT’S RECORD'}
                    </Text>
                  </View>
                  <Text variant="body" style={{ fontSize: 15, lineHeight: 22 }}>
                    {courtAnswer(item.id, s.id)}
                  </Text>
                </View>
              </Card>
            ))}
          </Animated.View>
        )}

        <View style={{ gap: space[2], marginTop: space[6] }}>
          <Button
            label="Edit my brief"
            variant="ghost"
            icon="create-outline"
            full
            onPress={() => {
              setStep(item.id, 0);
              router.push({ pathname: '/brief/[caseId]', params: { caseId: item.id } });
            }}
          />
          <Button label="Back to Write" variant="ghost" full onPress={toWriteTab} />
        </View>
      </Screen>
    </View>
  );
}
