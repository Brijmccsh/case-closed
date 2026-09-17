import { View } from 'react-native';

import { Screen } from './Screen';
import { ScreenHeader } from './ScreenHeader';
import { Text } from './Text';

export function NotFound() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader />
      <Screen top={false}>
        <Text variant="h1">Case not found</Text>
        <Text variant="body" color="inkMuted">
          This file may have moved. Head back to The Docket.
        </Text>
      </Screen>
    </View>
  );
}
