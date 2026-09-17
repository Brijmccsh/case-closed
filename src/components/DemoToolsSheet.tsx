import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { haptic } from '@/lib/haptics';
import { useBriefs } from '@/state/BriefsContext';
import { useProgress } from '@/state/ProgressContext';
import { radius, space, useTheme } from '@/theme/useTheme';

import { Text } from './Text';

/** Hidden recording helpers. Opened by long-pressing the logo on the My Docket tab. */
export function DemoToolsSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { resetProgress, demoCloseTinker } = useProgress();
  const { resetBriefs, demoJumpToStep, demoFinish } = useBriefs();

  const run = (fn: () => void) => () => {
    haptic.success();
    onClose();
    fn();
  };

  const tools: { icon: keyof typeof Ionicons.glyphMap; label: string; detail: string; onPress: () => void }[] = [
    {
      icon: 'refresh',
      label: 'Reset progress',
      detail: 'Clears closed cases, votes, saves, streak, and briefs',
      onPress: run(() => {
        resetProgress();
        resetBriefs();
      }),
    },
    { icon: 'checkmark-done', label: 'Mark Tinker as closed', detail: 'Quiz 3/3, voted, T.L.O. saved, 4-day streak', onPress: run(demoCloseTinker) },
    {
      icon: 'play-skip-forward',
      label: 'Jump to Write a Case, Step 3',
      detail: 'Tinker brief with Facts + Legal question filled in',
      onPress: run(() => {
        demoJumpToStep('tinker', 2);
        setTimeout(() => router.push({ pathname: '/brief/[caseId]', params: { caseId: 'tinker' } }), 250);
      }),
    },
    {
      icon: 'document-text',
      label: 'Finish the Tinker brief',
      detail: 'Fills all 5 steps and opens the finished brief card',
      onPress: run(() => {
        demoFinish('tinker');
        setTimeout(() => router.push({ pathname: '/brief/[caseId]/done', params: { caseId: 'tinker' } }), 250);
      }),
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: c.overlay }} onPress={onClose} accessibilityLabel="Close demo tools" />
      <View
        style={{
          backgroundColor: c.bg,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          padding: space[5],
          paddingBottom: insets.bottom + space[5],
          gap: space[2],
        }}
      >
        <View style={{ alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: c.borderStrong, marginBottom: space[2] }} />
        <Text variant="stamp" color="inkMuted">
          Demo tools · for recording
        </Text>
        {tools.map((t) => (
          <Pressable
            key={t.label}
            onPress={t.onPress}
            accessibilityRole="button"
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: space[3],
              padding: space[4],
              borderRadius: radius.md,
              backgroundColor: pressed ? c.surfaceAlt : c.surface,
              borderWidth: 1,
              borderColor: c.border,
            })}
          >
            <Ionicons name={t.icon} size={22} color={c.primaryText} />
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">{t.label}</Text>
              <Text variant="small" color="inkMuted">
                {t.detail}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}
