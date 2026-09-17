import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Logo } from '@/components/Logo';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { Text } from '@/components/Text';
import { haptic } from '@/lib/haptics';
import { useBriefs } from '@/state/BriefsContext';
import { useProgress } from '@/state/ProgressContext';
import { useSession } from '@/state/SessionContext';
import type { ThemePref } from '@/theme/ThemeProvider';
import { radius, space, useTheme } from '@/theme/useTheme';

const THEMES: { id: ThemePref; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'system', label: 'System', icon: 'phone-portrait-outline' },
  { id: 'light', label: 'Light', icon: 'sunny-outline' },
  { id: 'dark', label: 'Dark', icon: 'moon-outline' },
];

export default function Profile() {
  const { c, pref, setPref } = useTheme();
  const { user, logout } = useSession();
  const { resetProgress } = useProgress();
  const { resetBriefs } = useBriefs();

  const reset = () =>
    Alert.alert('Reset demo data?', 'This clears closed cases, votes, saved cases, your streak, and briefs.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          resetProgress();
          resetBriefs();
          haptic.success();
        },
      },
    ]);

  const signOut = () => {
    if (router.canDismiss()) router.dismissAll();
    logout();
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScreenHeader title="Profile" />
      <Screen top={false}>
        <View style={{ alignItems: 'center', gap: space[2], marginBottom: space[2] }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: c.ink, alignItems: 'center', justifyContent: 'center' }}>
            <Text variant="display" style={{ color: c.bg, fontSize: 38 }}>
              {(user?.name ?? 'A').slice(0, 1)}
            </Text>
          </View>
          <Text variant="h1">{user?.name}</Text>
          {user?.email ? (
            <Text variant="small" color="inkMuted">
              {user.email}
            </Text>
          ) : null}
        </View>

        <Card padded={false}>
          <Row label="Grade" value={`${user?.grade ?? '—'}th`} />
          <Row label="State" value={user?.state ?? '—'} />
          <Row label="Topics" value={`${user?.topics.length ?? 0} selected`} last />
        </Card>

        <SectionLabel title="Appearance" />
        <View style={{ flexDirection: 'row', padding: 4, borderRadius: radius.pill, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}>
          {THEMES.map((t) => {
            const on = pref === t.id;
            return (
              <Pressable
                key={t.id}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                onPress={() => {
                  haptic.tap();
                  setPref(t.id);
                }}
                style={{ flex: 1, height: 44, borderRadius: radius.pill, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: on ? c.ink : 'transparent' }}
              >
                <Ionicons name={t.icon} size={16} color={on ? c.bg : c.inkMuted} />
                <Text variant="small" weight="semibold" style={{ color: on ? c.bg : c.inkMuted }}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{ alignItems: 'center', marginTop: space[5] }}>
          <Logo height={110} />
        </View>

        <SectionLabel title="About" />
        <Card tone="alt" style={{ gap: space[2] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
            <Ionicons name="information-circle-outline" size={20} color={c.ink} />
            <Text variant="h3">Not legal advice</Text>
          </View>
          <Text variant="small" color="inkMuted" style={{ fontFamily: 'PublicSans_400Regular' }}>
            Case Closed explains court rulings and bills for education only. It isn't legal advice. If you're dealing with a
            legal situation, talk to a lawyer or a trusted adult.
          </Text>
        </Card>

        <View style={{ gap: space[3], marginTop: space[6] }}>
          <Button label="Reset demo data" variant="secondary" icon="refresh" full onPress={reset} />
          <Button label="Log out" variant="ghost" icon="log-out-outline" full onPress={signOut} />
        </View>
        <Text variant="micro" color="inkFaint" align="center" style={{ marginTop: space[4] }}>
          © 2026 Case Closed · v1.0
        </Text>
      </Screen>
    </View>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: space[4], borderBottomWidth: last ? 0 : 1, borderBottomColor: c.border }}>
      <Text variant="body" color="inkMuted" style={{ flex: 1 }}>
        {label}
      </Text>
      <Text variant="bodyStrong">{value}</Text>
    </View>
  );
}
