export const makeFirstLetterUpperCase = (string: string) => `${string[0].toUpperCase()}${string.slice(1)}`;

export const getPluralWord = (number: number, map: Record<string, string>) => map[new Intl.PluralRules('ru').select(number)];
