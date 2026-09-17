import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import type { QuizQuestion } from '@/data/types';
import { haptic } from '@/lib/haptics';
import { radius, space, useTheme } from '@/theme/useTheme';

import { PressableScale } from './PressableScale';
import { Text } from './Text';

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuizCard({ q, picked, onPick }: { q: QuizQuestion; picked: number | null; onPick: (i: number) => void }) {
  const { c } = useTheme();
  const answered = picked !== null;
  const right = picked === q.correctIndex;

  return (
    <View style={{ gap: space[3] }}>
      <Text variant="h1" style={{ fontSize: 28, lineHeight: 36 }}>
        {q.prompt}
      </Text>
      <View style={{ gap: space[2], marginTop: space[2] }}>
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isPicked = i === picked;
          const border = !answered ? c.border : isCorrect ? c.success : isPicked ? c.error : c.border;
          const bg = !answered ? c.surface : isCorrect ? `${c.success}1A` : isPicked ? `${c.error}14` : c.surface;
          return (
            <PressableScale
              key={i}
              disabled={answered}
              accessibilityRole="button"
              accessibilityLabel={`Option ${LETTERS[i]}: ${opt}`}
              onPress={() => {
                if (i === q.correctIndex) haptic.success();
                else haptic.error();
                onPick(i);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: space[3],
                padding: space[4],
                borderRadius: radius.md,
                borderWidth: answered && (isCorrect || isPicked) ? 2 : 1,
                borderColor: border,
                backgroundColor: bg,
                opacity: answered && !isCorrect && !isPicked ? 0.6 : 1,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: answered && isCorrect ? c.success : answered && isPicked ? c.error : c.surfaceAlt,
                  borderWidth: 1,
                  borderColor: answered && (isCorrect || isPicked) ? 'transparent' : c.border,
                }}
              >
                {answered && (isCorrect || isPicked) ? (
                  <Ionicons name={isCorrect ? 'checkmark' : 'close'} size={18} color={c.surface} />
                ) : (
                  <Text variant="stamp" color="inkMuted" style={{ letterSpacing: 0 }}>
                    {LETTERS[i]}
                  </Text>
                )}
              </View>
              <Text variant="body" style={{ flex: 1 }}>
                {opt}
              </Text>
            </PressableScale>
          );
        })}
      </View>
      {answered && (
        <Animated.View
          entering={FadeInDown.duration(300)}
          style={{
            padding: space[4],
            borderRadius: radius.md,
            backgroundColor: right ? c.accentSoft : c.highlightSoft,
            gap: 4,
          }}
        >
          <Text variant="stamp" color={right ? 'accent' : 'ink'}>
            {right ? 'Correct' : 'Not quite'}
          </Text>
          <Text variant="body">{q.explanation}</Text>
        </Animated.View>
      )}
    </View>
  );
}
