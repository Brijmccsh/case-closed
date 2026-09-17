import type { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

// { fg, bg } light; dark uses darkFg on `${darkFg}22` bg
export const topics = {
  speech: { label: 'School Speech', icon: 'megaphone-outline', fg: '#C94806', bg: '#FDE8DA', darkFg: '#FF9258' },
  privacy: { label: 'Digital Privacy', icon: 'lock-closed-outline', fg: '#127C7A', bg: '#DDF0EE', darkFg: '#3FB8B0' },
  justice: { label: 'Criminal Justice', icon: 'shield-outline', fg: '#102D56', bg: '#E3E9F2', darkFg: '#8FB2E6' },
  civil: { label: 'Civil Rights', icon: 'people-outline', fg: '#6B3FA0', bg: '#EEE6F7', darkFg: '#B794E0' },
  employment: { label: 'Employment', icon: 'briefcase-outline', fg: '#7A5E00', bg: '#FFF3C4', darkFg: '#F2C94C' },
  environment: { label: 'Environment', icon: 'leaf-outline', fg: '#2E7D4F', bg: '#E1F2E7', darkFg: '#5FC98A' },
  health: { label: 'Health', icon: 'medkit-outline', fg: '#A8324F', bg: '#F9E1E8', darkFg: '#F07F9F' },
} satisfies Record<string, { label: string; icon: IconName; fg: string; bg: string; darkFg: string }>;

export type TopicId = keyof typeof topics;
export const topicIds = Object.keys(topics) as TopicId[];
