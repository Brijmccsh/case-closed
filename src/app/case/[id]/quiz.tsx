import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import { Button } from '@/components/Button';
import { NotFound } from '@/components/NotFound';
import { QuizCard } from '@/components/QuizCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Text } from '@/components/Text';
import { getItem } from '@/data/docket';
import { useProgress } from '@/state/ProgressContext';
import { space, useTheme } from '@/theme/useTheme';

export default function Quiz() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getItem(id);
  const { saveQuiz } = useProgress();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);

  if (!item) return <NotFound />;
  const q = item.quiz[index];
  const picked = answers[index];
  const last = index === item.quiz.length - 1;

  const next = () => {
    if (!last) {
      setIndex(index + 1);
      return;
    }
    const final = answers.map((a) => a ?? -1);
    saveQuiz(item.id, {
      answers: final,
      correct: final.filter((a, i) => a === item.quiz[i].correctIndex).length,
      total: item.quiz.length,
    });
    router.push({ pathname: '/case/[id]/verdict', params: { id: item.id, from: 'quiz' } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScreenHeader title={`Test yourself  ·  ${item.shortTitle}`} icon="close" />
      <Screen
        top={false}
        footer={
          <Button
            label={last ? 'Cast your verdict' : 'Next question'}
            full
            iconRight="arrow-forward"
            disabled={picked === null}
            onPress={next}
          />
        }
      >
        <View style={{ flexDirection: 'row', gap: 6, marginBottom: space[2] }}>
          {item.quiz.map((qq, i) => {
            const a = answers[i];
            const color = a === null ? (i === index ? c.ink : c.border) : a === qq.correctIndex ? c.success : c.error;
            return <View key={qq.id} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: color }} />;
          })}
        </View>
        <Text variant="stamp" color="inkMuted" style={{ marginBottom: space[3] }}>
          {`Question ${index + 1} of ${item.quiz.length}`}
        </Text>
        <Animated.View key={q.id} entering={FadeInRight.duration(280)} exiting={FadeOutLeft.duration(160)}>
          <QuizCard
            q={q}
            picked={picked}
            onPick={(i) => setAnswers((prev) => prev.map((p, j) => (j === index ? i : p)))}
          />
        </Animated.View>
      </Screen>
    </View>
  );
}
