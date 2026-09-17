import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Text } from '@/components/Text';
import { docket } from '@/data/docket';
import { lookupTerm } from '@/data/glossary';
import { safeBack } from '@/lib/nav';
import { radius, space, useTheme } from '@/theme/useTheme';

export default function GlossarySheet() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { term } = useLocalSearchParams<{ term: string }>();
  const entry = lookupTerm(term ?? '');
  const seenIn = docket.filter((d) => d.glossaryTerms.some((t) => t.toLowerCase() === term?.toLowerCase())).slice(0, 4);

  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: space[6], paddingTop: space[8], paddingBottom: insets.bottom + space[6], gap: space[4] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
        <View style={{ backgroundColor: c.highlight, paddingHorizontal: space[2], paddingVertical: 2, borderRadius: radius.xs }}>
          <Text variant="stamp" style={{ color: '#102D56' }}>
            Glossary
          </Text>
        </View>
        <Text variant="stamp" color="inkFaint">
          Plain English
        </Text>
      </View>
      <Text variant="display" style={{ fontSize: 40 }}>
        {entry?.term ?? term}
      </Text>
      <Text variant="body" style={{ fontSize: 18, lineHeight: 28 }}>
        {entry?.definition ?? "We don't have a definition for this term yet."}
      </Text>
      {seenIn.length > 0 && (
        <View style={{ gap: space[2] }}>
          <Text variant="stamp" color="inkMuted">
            Seen in
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            {seenIn.map((d) => (
              <Chip
                key={d.id}
                label={d.shortTitle}
                onPress={() => {
                  safeBack();
                  setTimeout(() => router.push({ pathname: d.kind === 'bill' ? '/bill/[id]' : '/case/[id]', params: { id: d.id } }), 300);
                }}
              />
            ))}
          </View>
        </View>
      )}
      <Button label="Got it" full onPress={safeBack} style={{ marginTop: space[2] }} />
    </ScrollView>
  );
}
