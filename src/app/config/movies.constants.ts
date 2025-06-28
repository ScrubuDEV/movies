export const BASE_IMG = 'https://image.tmdb.org/t/p/w500';

export const STORAGE_KEY = 'movieCollections';

export const enum StarFill {
  Full = 'full',
  Half = 'half',
  Empty = 'empty',
}

export const StarFillObject = {
  Full: StarFill.Full,
  Half: StarFill.Half,
  Empty: StarFill.Empty,
} as const;

export const LanguageTranslation = {
  EN: 'en',
  FR: 'fr',
};
