import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { Chip } from '@/components/Chip';
import { DocketCard } from '@/components/DocketCard';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { docket } from '@/data/docket';
import { stripGlossary } from '@/lib/glossaryParser';
import { topicIds, type TopicId } from '@/theme/tokens/topics';
import { radius, space, useTheme } from '@/theme/useTheme';

type Kind = 'all' | 'case' | 'bill';
type Court = 'all' | 'supreme' | 'other';

const SUGGESTIONS = ['phone', 'search', 'speech', 'Miranda'];

export default function Explore() {
  const { c, topic } = useTheme();
  const [q, setQ] = useState('');
  const [topicF, setTopicF] = useState<TopicId | null>(null);
  const [kind, setKind] = useState<Kind>('all');
  const [court, setCourt] = useState<Court>('all');

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return docket.filter((d) => {
      if (topicF && d.topic !== topicF) return false;
      if (kind !== 'all' && d.kind !== kind) return false;
      if (court === 'supreme' && d.courtLevel !== 'supreme') return false;
      if (court === 'other' && d.courtLevel !== 'other') return false;
      if (!needle) return true;
      const hay = [d.title, d.shortTitle, topic(d.topic).label, stripGlossary(d.tldr), ...d.keywords, ...d.glossaryTerms].join(' ').toLowerCase();
      return hay.includes(needle);
    });
  }, [q, topicF, kind, court, topic]);

  const clear = () => {
    setQ('');
    setTopicF(null);
    setKind('all');
    setCourt('all');
  };

  return (
    <Screen>
      <Text variant="stamp" color="inkMuted">
        Explore
      </Text>
      <Text variant="h1">Find a case or bill</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: space[2],
          marginTop: space[4],
          height: 52,
          paddingHorizontal: space[4],
          borderRadius: radius.pill,
          backgroundColor: c.surface,
          borderWidth: 1,
          borderColor: c.border,
        }}
      >
        <Ionicons name="search" size={20} color={c.inkFaint} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search by name, topic, or keyword"
          placeholderTextColor={c.inkFaint}
          returnKeyType="search"
          autoCorrect={false}
          style={{ flex: 1, fontFamily: 'PublicSans_400Regular', fontSize: 16, color: c.ink, height: '100%' }}
        />
        {q ? <Ionicons name="close-circle" size={20} color={c.inkFaint} onPress={() => setQ('')} accessibilityLabel="Clear search" /> : null}
      </View>

      <FilterRow>
        {(['all', 'case', 'bill'] as Kind[]).map((k) => (
          <Chip key={k} label={{ all: 'All', case: 'Rulings', bill: 'Bills' }[k]} selected={kind === k} onPress={() => setKind(k)} />
        ))}
        <View style={{ width: 1, backgroundColor: c.border, marginHorizontal: space[1] }} />
        {(['supreme', 'other'] as Court[]).map((k) => (
          <Chip key={k} label={k === 'supreme' ? 'Supreme Court' : 'Other courts'} selected={court === k} onPress={() => setCourt(court === k ? 'all' : k)} />
        ))}
      </FilterRow>
      <FilterRow>
        {topicIds.map((t) => (
          <Chip key={t} label={topic(t).label} icon={topic(t).icon} selected={topicF === t} onPress={() => setTopicF(topicF === t ? null : t)} />
        ))}
      </FilterRow>

      <Text variant="micro" color="inkFaint" style={{ marginTop: space[4], marginBottom: space[3] }}>
        {`${results.length} ${results.length === 1 ? 'result' : 'results'}`}
      </Text>

      {results.length ? (
        <View style={{ gap: space[3] }}>
          {results.map((d) => (
            <DocketCard key={d.id} item={d} />
          ))}
        </View>
      ) : (
        <View style={{ alignItems: 'center', gap: space[3], paddingVertical: space[8] }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: c.highlightSoft, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="document-text-outline" size={30} color={c.ink} />
          </View>
          <Text variant="h2" align="center">
            No cases match that yet
          </Text>
          <Text variant="body" color="inkMuted" align="center">
            {topicF === 'employment' || topicF === 'health'
              ? `Our student reporters are working on ${topic(topicF).label} explainers. Try one of these instead:`
              : 'Try a different word, or one of these:'}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2], justifyContent: 'center' }}>
            {SUGGESTIONS.map((s) => (
              <Chip
                key={s}
                label={s}
                onPress={() => {
                  clear();
                  setQ(s);
                }}
              />
            ))}
          </View>
        </View>
      )}
    </Screen>
  );
}

function FilterRow({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -space[5], marginTop: space[3] }}
      contentContainerStyle={{ gap: space[2], paddingHorizontal: space[5] }}
    >
      {children}
    </ScrollView>
  );
}
