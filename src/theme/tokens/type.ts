export const type = {
  display: { size: 44, lineHeight: 56, family: 'BarlowCondensed_700Bold' },
  h1: { size: 32, lineHeight: 41, family: 'BarlowCondensed_700Bold' },
  h2: { size: 24, lineHeight: 31, family: 'BarlowCondensed_600SemiBold' },
  h3: { size: 18, lineHeight: 25, family: 'PublicSans_700Bold' },
  body: { size: 16, lineHeight: 24, family: 'PublicSans_400Regular' },
  bodyStrong: { size: 16, lineHeight: 24, family: 'PublicSans_600SemiBold' },
  small: { size: 14, lineHeight: 20, family: 'PublicSans_500Medium' },
  stamp: { size: 13, lineHeight: 17, family: 'BarlowCondensed_600SemiBold', letterSpacing: 1.6, uppercase: true },
  micro: { size: 11, lineHeight: 15, family: 'PublicSans_600SemiBold', letterSpacing: 0.4 },
  quote: { size: 20, lineHeight: 28, family: 'Newsreader_400Regular_Italic' },
} as const;

export type TypeVariant = keyof typeof type;

// Weights override the family of a variant without changing its size.
export const weights = {
  regular: 'PublicSans_400Regular',
  medium: 'PublicSans_500Medium',
  semibold: 'PublicSans_600SemiBold',
  bold: 'PublicSans_700Bold',
  displaySemi: 'BarlowCondensed_600SemiBold',
  displayBold: 'BarlowCondensed_700Bold',
  quoteItalic: 'Newsreader_400Regular_Italic',
} as const;

export type Weight = keyof typeof weights;
