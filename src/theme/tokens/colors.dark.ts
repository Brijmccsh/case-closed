import { light } from './colors.light';

export const dark = {
  ...light,
  bg: '#0A1628',
  surface: '#111F36',
  surfaceAlt: '#182B47',
  surfaceInk: '#16294A',
  onSurfaceInk: '#F4F1EA',
  ink: '#F4F1EA',
  inkMuted: '#B3BFD1',
  inkFaint: '#7F8DA3',
  primary: '#FF7433',
  primaryPressed: '#FF9258',
  primaryOn: '#0A1628',
  brand: '#FF7433',
  primaryText: '#FF8A4F',
  primarySoft: '#3A2114',
  accent: '#3FB8B0',
  accentSoft: '#0F3534',
  highlight: '#FFD84D',
  highlightSoft: '#3D3413',
  pollNeutral: '#2A3F60',
  border: '#22385A',
  borderStrong: '#30496F',
  success: '#4CC38A',
  warning: '#F2B84B',
  error: '#F07065',
  overlay: 'rgba(0,0,0,0.6)',
} as const;

export type Palette = { [K in keyof typeof light]: string };
