import { MAX_DESCRIPTION_LENGTH } from 'consts/app';
import { Status } from 'consts/enum';
import { StatusData } from 'types/app';

export const makeFirstLetterUpperCase = (string: string) =>
  `${string[0].toUpperCase()}${string.slice(1)}`;

export const getPluralWord = (
  number: number,
  map: Pick<Record<Intl.LDMLPluralRule, string>, 'one' | 'few' | 'many'>
) => map[new Intl.PluralRules('ru').select(number) as 'one' | 'few' | 'many'];

export const getDottedDescription = (description: string, maxLength = MAX_DESCRIPTION_LENGTH) =>
  description.length > maxLength ? `${description.slice(0, maxLength - 1)}...` : description;

export const getPaginationVariables = (
  arrayLength: number,
  maxPerPageNumber: number,
  currentPage: string | undefined
) => {
  const totalPages = Math.ceil(arrayLength / maxPerPageNumber);
  const page = +(currentPage || 1) > totalPages ? 1 : +(currentPage || 1);

  const sliceStart = (page - 1) * maxPerPageNumber;
  const leftItems = arrayLength - sliceStart;
  const maxElementsCount = Math.min(leftItems, arrayLength, maxPerPageNumber);
  const sliceEnd = sliceStart + maxElementsCount;
  return { totalPages, currentPage: page, sliceEnd, maxElementsCount, sliceStart };
};

export const checkStatus = ({ status, code = {} }: StatusData) => {
  const isLoading = Object.values(status).some(
    (value) => value === Status.Loading || value === Status.Idle
  );
  const isError = Object.values(status).some((value) => value === Status.Error);
  const isNotFound = Object.values(code).some((value) => value === '404');

  return { isLoading, isError, isNotFound };
};

export const getRandomNumber = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

export const getRandomArrayElement = <T>(elements: T[]) =>
  elements[getRandomNumber(0, elements.length - 1)];

export const createRandomElementsArray = <T>(elements: T[], length: number = elements.length) => {
  const newElements = [...elements];

  for (let i = 0; i < Math.min(newElements.length, length); i++) {
    const randomIndex = getRandomNumber(i, newElements.length - 1);

    [newElements[i], newElements[randomIndex]] = [newElements[randomIndex], newElements[i]];
  }

  return length === newElements.length
    ? newElements
    : newElements.slice(0, Math.min(length, newElements.length));
};

export const toggleValueInArray = <T>(array: T[], value: T) => {
  let elements = [...array];
  if (elements.includes(value)) {
    elements = elements.filter((el) => el !== value);
  } else {
    elements.push(value);
  }

  return elements;
};

export const toggleArrayValueInStorage = <T>(value: T) => {
  const items = JSON.parse(localStorage.getItem('favorites_comp_shop') || '[]');

  if (Array.isArray(items)) {
    const elements = toggleValueInArray(items, value);
    localStorage.setItem('favorites_comp_shop', JSON.stringify(elements));
  } else {
    localStorage.setItem('favorites_comp_shop', JSON.stringify([]));
  }
};

export const filterArrayByString = (array: any[], string: string) => {
  if (!string) {
    return [];
  }

  return array.filter((i) =>
    i.name.toLowerCase().replaceAll(' ', '').includes(string.replaceAll(' ', '').toLowerCase())
  );
};

export const callAll =
  <E extends any[], T extends any[] = { [K in keyof E]: E[K] }>(
    ...fns: (((...args: T) => void) | undefined)[]
  ) =>
  (...args: T) =>
    fns.forEach((fn) => fn?.(...args));
