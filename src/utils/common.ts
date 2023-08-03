import { MAX_DESCRIPTION_LENGTH } from 'consts/app';
import { Status } from 'consts/enum';
import { StatusData } from 'types/app';

export const makeFirstLetterUpperCase = (string: string) =>
  `${string[0].toUpperCase()}${string.slice(1)}`;

export const getPluralWord = (number: number, map: Record<string, string>) =>
  map[new Intl.PluralRules('ru').select(number)];

export const getDottedDescription = (description: string) =>
  description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...`
    : description;

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
