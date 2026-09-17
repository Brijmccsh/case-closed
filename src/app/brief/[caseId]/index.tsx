import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble, CoachThinking, type ChatMessage } from '@/components/CoachBubble';
import { NotFound } from '@/components/NotFound';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StepProgress } from '@/components/StepProgress';
import { Text } from '@/components/Text';
import { briefSteps, type StepId } from '@/data/coach';
import { getCase } from '@/data/docket';
import { coachReply, thinkingMs, type HintLevel } from '@/lib/coachEngine';
import { haptic } from '@/lib/haptics';
import { useBriefs } from '@/state/BriefsContext';
import { radius, space, useTheme } from '@/theme/useTheme';

const INTRO: Record<StepId, string> = {
  facts: "Take your best shot. I'll ask questions, not give answers. Tap Check when you're ready.",
  question: 'Nice. Now zoom out: what did the court actually have to decide?',
  holding: "Now for the result. Keep it short: who won, and what was the vote?",
  reasoning: 'This is the heart of a brief. What rule did the majority use to get there?',
  matters: 'Last step. Bring it home: how does this reach your own school?',
};

let msgId = 0;
const newId = () => `m${++msgId}`;

export default function BriefFlow() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const item = getCase(caseId);
  const { get, start, setAnswer, setStep, bumpHint, finish } = useBriefs();
  const brief = get(caseId);
  const stepIndex = brief?.stepIndex ?? 0;
  const step = briefSteps[stepIndex];

  const [chat, setChat] = useState<Partial<Record<StepId, ChatMessage[]>>>({});
  const [thinking, setThinking] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (caseId) start(caseId);
  }, [caseId, start]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // Each step opens with a Coach welcome line.
  useEffect(() => {
    setChat((prev) => (prev[step.id] ? prev : { ...prev, [step.id]: [{ id: newId(), from: 'coach', text: INTRO[step.id] }] }));
  }, [step.id]);

  if (!item || !item.briefable) return <NotFound />;

  const answer = brief?.answers[step.id] ?? '';
  const hintsUsed = (brief?.hintsUsed[step.id] ?? 0) as HintLevel;
  const messages = chat[step.id] ?? [];
  const last = stepIndex === briefSteps.length - 1;

  const push = (m: ChatMessage) => setChat((prev) => ({ ...prev, [step.id]: [...(prev[step.id] ?? []), m] }));
  const scrollDown = () => setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 80);

  const respond = (level: HintLevel, studentEcho?: string) => {
    if (thinking) return;
    if (studentEcho) push({ id: newId(), from: 'student', text: studentEcho });
    setThinking(true);
    scrollDown();
    const reply = coachReply(item.id, step.id, answer, level);
    timer.current = setTimeout(() => {
      setThinking(false);
      haptic.light();
      push({
        id: newId(),
        from: 'coach',
        text: reply.text,
        tag: reply.kind === 'hint' ? `Nudge ${level} of 3` : reply.kind === 'affirm' ? 'On track' : undefined,
      });
      scrollDown();
    }, thinkingMs(studentEcho ?? reply.text));
  };

  const check = () => respond(0, answer.trim() || '(I’m not sure where to start.)');

  const nudge = () => {
    if (hintsUsed >= 3) return;
    const level = (hintsUsed + 1) as HintLevel;
    bumpHint(item.id, step.id);
    respond(level);
  };

  const next = () => {
    haptic.tap();
    if (last) {
      finish(item.id);
      router.push({ pathname: '/brief/[caseId]/done', params: { caseId: item.id } });
      return;
    }
    setStep(item.id, stepIndex + 1);
    scroll.current?.scrollTo({ y: 0, animated: true });
  };

  const back = () => {
    if (stepIndex > 0) setStep(item.id, stepIndex - 1);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: c.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader
        title={`Write a Case  ·  ${item.shortTitle}`}
        right={
          <Button
            label="Reread"
            size="sm"
            variant="secondary"
            icon="book-outline"
            onPress={() => router.push({ pathname: '/case/[id]', params: { id: item.id } })}
          />
        }
      />
      <ScrollView
        ref={scroll}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: space[5], paddingBottom: space[6], gap: space[4] }}
        onContentSizeChange={() => thinking && scroll.current?.scrollToEnd({ animated: true })}
      >
        <StepProgress index={stepIndex} />

        <Animated.View key={step.id} entering={FadeInRight.duration(300)} style={{ gap: space[4] }}>
          <Card style={{ gap: space[2], padding: space[5], borderTopWidth: 4, borderTopColor: c.brand }}>
            <Text variant="stamp" color="primaryText">
              {step.label}
            </Text>
            <Text variant="h2" style={{ fontSize: 26, lineHeight: 33 }}>
              {step.prompt}
            </Text>
          </Card>

          <View style={{ gap: space[3] }}>
            {messages.map((m) => (
              <CoachBubble key={m.id} msg={m} />
            ))}
            {thinking && <CoachThinking />}
          </View>

          <View style={{ gap: space[2] }}>
            <Text variant="stamp" color="inkMuted">
              Your brief
            </Text>
            <TextInput
              value={answer}
              onChangeText={(t) => setAnswer(item.id, step.id, t)}
              placeholder={step.placeholder}
              placeholderTextColor={c.inkFaint}
              multiline
              textAlignVertical="top"
              accessibilityLabel={`${step.label}: ${step.prompt}`}
              style={{
                minHeight: 130,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: c.borderStrong,
                backgroundColor: c.surface,
                padding: space[4],
                paddingTop: space[4],
                fontFamily: 'PublicSans_400Regular',
                fontSize: 16,
                lineHeight: 24,
                color: c.ink,
              }}
            />
            <View style={{ flexDirection: 'row', gap: space[2] }}>
              <Button label="Check with Coach" size="sm" variant="accent" icon="chatbubble-ellipses-outline" onPress={check} disabled={thinking} />
              <Button
                label={hintsUsed >= 3 ? 'No more nudges' : 'Nudge me'}
                size="sm"
                variant="secondary"
                icon="bulb-outline"
                onPress={nudge}
                disabled={thinking || hintsUsed >= 3}
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          gap: space[2],
          paddingHorizontal: space[5],
          paddingTop: space[3],
          paddingBottom: insets.bottom + space[3],
          borderTopWidth: 1,
          borderTopColor: c.border,
          backgroundColor: c.bg,
        }}
      >
        {stepIndex > 0 && <Button label="Back" variant="secondary" icon="chevron-back" onPress={back} />}
        <Button
          label={last ? 'Finish brief' : 'Next step'}
          iconRight={last ? 'checkmark' : 'arrow-forward'}
          full
          style={{ flex: 1 }}
          disabled={!answer.trim()}
          onPress={next}
        />
      </View>
      {!answer.trim() && (
        <View pointerEvents="none" style={{ position: 'absolute', bottom: insets.bottom + 78, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="pencil" size={12} color={c.inkFaint} />
          <Text variant="micro" color="inkFaint">
            Write something to move on
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
