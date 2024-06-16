import tailwindcssTheme from './tailwind.theme.json';

export type ColorType = keyof (typeof tailwindcssTheme.colors);
export type TypographyType = keyof (typeof tailwindcssTheme.fontSize);
export type BoxShadowType = keyof (typeof tailwindcssTheme.boxShadow);

export type TypographyClassNameType = `text-${TypographyType}`;
export type BackgroundColorClassNameType = `bg-${ColorType}`;
export type TextColorClassNameType = `text-${ColorType}`;
export type FillColorClassNameType = `fill-${ColorType}`;
export type BoxShadowClassNameType = `shadow-${BoxShadowType}`;
export type BorderColorClassNameType = `border-${ColorType}`;
