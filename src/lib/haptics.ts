import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const ok = Platform.OS !== 'web';

export const haptic = {
  tap: () => ok && Haptics.selectionAsync().catch(() => {}),
  light: () => ok && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}),
  thud: () => ok && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {}),
  success: () => ok && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
  error: () => ok && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {}),
};
