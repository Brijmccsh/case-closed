import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, TextInput, View, type TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Text } from '@/components/Text';
import { demoPersona, US_STATES } from '@/data/user';
import { useSession } from '@/state/SessionContext';
import { radius, space, useTheme } from '@/theme/useTheme';

const GRADES = [6, 7, 8, 9, 10, 11, 12];

export default function SignUp() {
  const { signUp } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState<number | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [picker, setPicker] = useState(false);

  const submit = () => {
    // Fake auth: any input proceeds; blanks fall back to the demo persona.
    signUp({
      name: name.trim() || demoPersona.name,
      email: email.trim(),
      grade: grade ?? demoPersona.grade,
      state: state ?? demoPersona.state,
    });
    router.push('/onboarding');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title="Create your account" />
      <Screen top={false} footer={<Button label="Continue" full iconRight="arrow-forward" onPress={submit} />}>
        <Text variant="h1">Let's open your case file.</Text>
        <Text variant="body" color="inkMuted" style={{ marginTop: space[1], marginBottom: space[5] }}>
          No legal background needed. Just a little about you.
        </Text>

        <Field label="First name">
          <Input value={name} onChangeText={setName} placeholder="Alex" autoCapitalize="words" textContentType="givenName" />
        </Field>
        <Field label="Email">
          <Input value={email} onChangeText={setEmail} placeholder="you@school.org" keyboardType="email-address" autoCapitalize="none" textContentType="emailAddress" />
        </Field>
        <Field label="Grade">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            {GRADES.map((g) => (
              <Chip key={g} label={`${g}th`} selected={grade === g} onPress={() => setGrade(g)} />
            ))}
          </View>
        </Field>
        <Field label="Your state">
          <StateButton value={state} onPress={() => setPicker(true)} />
        </Field>
        <Field label="Password">
          <Input value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry textContentType="newPassword" />
        </Field>
        <Text variant="micro" color="inkFaint" style={{ marginTop: space[2] }}>
          Demo app: nothing you enter leaves this device.
        </Text>
      </Screen>
      <StatePicker visible={picker} onClose={() => setPicker(false)} onPick={(s) => { setState(s); setPicker(false); }} />
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: space[2], marginBottom: space[5] }}>
      <Text variant="stamp" color="inkMuted">
        {label}
      </Text>
      {children}
    </View>
  );
}

export function Input(props: TextInputProps) {
  const { c } = useTheme();
  const [focus, setFocus] = useState(false);
  return (
    <TextInput
      placeholderTextColor={c.inkFaint}
      {...props}
      onFocus={(e) => { setFocus(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocus(false); props.onBlur?.(e); }}
      style={[
        {
          height: 52,
          borderRadius: radius.md,
          borderWidth: focus ? 2 : 1,
          borderColor: focus ? c.accent : c.border,
          backgroundColor: c.surface,
          paddingHorizontal: space[4],
          fontFamily: 'PublicSans_400Regular',
          fontSize: 16,
          color: c.ink,
        },
        props.style,
      ]}
    />
  );
}

function StateButton({ value, onPress }: { value: string | null; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={{
        height: 52,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: c.border,
        backgroundColor: c.surface,
        paddingHorizontal: space[4],
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text variant="body" color={value ? 'ink' : 'inkFaint'} style={{ flex: 1 }}>
        {value ?? 'Choose your state'}
      </Text>
      <Ionicons name="chevron-down" size={20} color={c.inkMuted} />
    </Pressable>
  );
}

function StatePicker({ visible, onClose, onPick }: { visible: boolean; onClose: () => void; onPick: (s: string) => void }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: c.overlay }} onPress={onClose} />
      <View style={{ height: '70%', backgroundColor: c.bg, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, paddingTop: space[4] }}>
        <Text variant="stamp" color="inkMuted" style={{ paddingHorizontal: space[5], marginBottom: space[2] }}>
          Your state
        </Text>
        <FlatList
          data={US_STATES}
          keyExtractor={(s) => s}
          contentContainerStyle={{ paddingBottom: insets.bottom + space[4] }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onPick(item)}
              style={({ pressed }) => ({ paddingVertical: space[3], paddingHorizontal: space[5], backgroundColor: pressed ? c.surfaceAlt : 'transparent' })}
            >
              <Text variant="body">{item}</Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}
