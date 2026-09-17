import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { FadeIn } from '@/components/FadeIn';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/Text';
import { demoPersona } from '@/data/user';
import { useSession } from '@/state/SessionContext';
import { space } from '@/theme/useTheme';

const HERO = ['#0A1628', '#102D56'] as const;

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const { signUp, setTopics, completeOnboarding } = useSession();

  const signInDemo = () => {
    // Fake auth: "I already have an account" signs in as the demo persona.
    signUp({ name: demoPersona.name, email: 'alex@example.com', grade: demoPersona.grade, state: demoPersona.state });
    setTopics(['speech', 'privacy']);
    completeOnboarding();
  };

  return (
    <LinearGradient colors={HERO} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={{ flex: 1, paddingTop: insets.top + space[10], paddingHorizontal: space[6], paddingBottom: insets.bottom + space[6] }}>
        <FadeIn index={0} style={{ alignItems: 'center', marginTop: space[6] }}>
          <Logo onInk height={180} />
        </FadeIn>
        <View style={{ flex: 1 }} />
        <FadeIn index={2} style={{ gap: space[3] }}>
          <Text variant="stamp" style={{ color: '#FF9258' }}>
            Know the law that shapes your life
          </Text>
          <Text variant="display" color="onSurfaceInk" style={{ fontSize: 50 }}>
            Your rights, unredacted.
          </Text>
          <Text variant="body" color="onSurfaceInk" style={{ opacity: 0.82, fontSize: 17, lineHeight: 26 }}>
            Real court rulings and pending bills, translated into plain, nonpartisan language for teens.
          </Text>
        </FadeIn>
        <FadeIn index={4} style={{ gap: space[3], marginTop: space[8] }}>
          <Button label="Get started" full iconRight="arrow-forward" onPress={() => router.push('/signup')} />
          <Button label="I already have an account" variant="onInk" full onPress={signInDemo} />
        </FadeIn>
      </View>
    </LinearGradient>
  );
}
