export const excludeFalsy = <_, T>(value: T): value is Exclude<T, undefined> => Boolean(value);
export const getObjectKeys = Object.keys as <T extends object>(obj: T) => [keyof T];
export const getObjectValues = Object.values as <T extends object>(obj: T) => [T[keyof T]];
export const isNonNullable = <T>(value: T): value is NonNullable<T> => !!value;
export const hasOwn = <Obj extends object>(obj: Obj, key: PropertyKey): key is keyof Obj =>
  Object.hasOwn(obj, key);
export const isEnumValue = <Obj extends Record<string, string>>(
  obj: Obj,
  value: string
): value is Obj[keyof Obj] => Object.values(obj).some((el) => el === value);
export const checkSwitch = (value: never) => value;
export const isIncluded = <T extends readonly string[]>(str: string, values: T): str is T[number] =>
  values.includes(str);
