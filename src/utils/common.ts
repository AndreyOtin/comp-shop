import { MAX_DESCRIPTION_LENGTH } from 'consts/app';

export const makeFirstLetterUpperCase = (string: string) =>
  `${string[0].toUpperCase()}${string.slice(1)}`;

export const getPluralWord = (number: number, map: Record<string, string>) =>
  map[new Intl.PluralRules('ru').select(number)];

export const getDottedDescription = (description: string) =>
  description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...`
    : description;
