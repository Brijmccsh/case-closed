import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button } from '@/components/Button';
import { NotFound } from '@/components/NotFound';
import { Card } from '@/components/Card';
import { CaseClosedStamp } from '@/components/CaseClosedStamp';
import { PrecedentChain } from '@/components/PrecedentChain';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Stamp } from '@/components/Stamp';
import { Text } from '@/components/Text';
import { VerdictPoll } from '@/components/VerdictPoll';
import { getItem } from '@/data/docket';
import { openBrief } from '@/lib/nav';
import { useProgress } from '@/state/ProgressContext';
import { space, useTheme } from '@/theme/useTheme';

export default function Verdict() {
  const { c } = useTheme();
  const { id, from } = useLocalSearchParams<{ id: string; from?: string }>();
  const item = getItem(id);
  const { item: progressOf, castVote } = useProgress();
  const existing = item ? progressOf(item.id) : {};
  // Only animate the stamp when the vote happens on this visit.
  const [justVoted, setJustVoted] = useState(false);
  const scroll = useRef<ScrollView>(null);

  useEffect(() => {
    if (justVoted) {
      const t = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 1300);
      return () => clearTimeout(t);
    }
  }, [justVoted]);

  if (!item) return <NotFound />;
  const vote = existing.vote;
  const quiz = existing.quiz;
  const isCase = item.kind === 'case';

  // Quiz → verdict → "Back to case": pop both screens so the case is on top again.
  const backToCase = () => {
    const count = from === 'quiz' ? 2 : 1;
    if (router.canDismiss()) router.dismiss(count);
    else router.replace({ pathname: item.kind === 'bill' ? '/bill/[id]' : '/case/[id]', params: { id: item.id } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScreenHeader title="Your verdict" onBack={backToCase} />
      <Screen top={false} scrollProps={{ ref: scroll } as object}>
        {quiz && (
          <Card tone={quiz.correct === quiz.total ? 'soft' : 'alt'} style={{ flexDirection: 'row', alignItems: 'center', gap: space[3], marginBottom: space[5] }}>
            <Ionicons name="school" size={24} color={c.primaryText} />
            <Text variant="bodyStrong" style={{ flex: 1 }}>
              {`Quiz: ${quiz.correct} of ${quiz.total} correct`}
            </Text>
            {quiz.correct === quiz.total && <Ionicons name="star" size={20} color={c.brand} />}
          </Card>
        )}
        <Stamp parts={[item.shortTitle, item.year]} />
        <Text variant="h1" style={{ marginTop: space[1] }}>
          {item.poll.question}
        </Text>
        <Text variant="body" color="inkMuted" style={{ marginTop: space[1], marginBottom: space[5] }}>
          {vote
            ? isCase
              ? `The court's actual ruling was ${item.status}. Here's how other readers voted.`
              : "Here's how other readers voted."
            : "There's no right answer. Vote first, then see how other readers voted."}
        </Text>

        <VerdictPoll
          poll={item.poll}
          vote={vote}
          onVote={(v) => {
            castVote(item.id, v);
            setJustVoted(true);
          }}
        />

        {vote && (
          <View style={{ alignItems: 'center', marginTop: space[8], marginBottom: space[4] }}>
            <CaseClosedStamp play={justVoted} delay={1000} label={isCase ? 'Case Closed' : 'On the record'} />
          </View>
        )}

        {vote && (
          <Animated.View entering={justVoted ? FadeInDown.delay(1500).duration(400) : undefined} style={{ gap: space[3], marginTop: space[4] }}>
            {item.precedents.before.length + item.precedents.after.length > 0 && (
              <Card style={{ gap: space[3] }}>
                <Text variant="stamp" color="accent">
                  How this case connects
                </Text>
                <PrecedentChain id={item.id} before={item.precedents.before} after={item.precedents.after} />
              </Card>
            )}
            {item.kind === 'case' && item.briefable && (
              <Button label="Brief this case with Coach" icon="create-outline" variant="secondary" full onPress={() => openBrief(item.id, false)} />
            )}
            <Button label={isCase ? 'Back to case' : 'Back to bill'} full onPress={backToCase} />
          </Animated.View>
        )}
      </Screen>
    </View>
  );
}
