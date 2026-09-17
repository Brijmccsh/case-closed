import { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

export { radius, shadow, space } from './tokens/space';
export { type } from './tokens/type';
export { topics, topicIds, type TopicId } from './tokens/topics';
