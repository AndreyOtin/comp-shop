export type DetailedButtonProps<E> = React.DetailedHTMLProps<React.ButtonHTMLAttributes<E>, E>;
export type DetailedProps<E> = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>;
export type DetailedSVGProps<E> = React.DetailedHTMLProps<React.SVGAttributes<E>, E>;
export type DetailedInputProps<E> = React.DetailedHTMLProps<React.InputHTMLAttributes<E>, E>;
export type DetailedLabelProps<E> = React.DetailedHTMLProps<React.LabelHTMLAttributes<E>, E>;

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
