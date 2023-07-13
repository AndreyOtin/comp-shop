export type DetailedButtonProps<E> = React.DetailedHTMLProps<React.ButtonHTMLAttributes<E>, E>;
export type DetailedProps<E> = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>;
export type DetailedSVGProps<E> = React.DetailedHTMLProps<React.SVGAttributes<E>, E>;
export type DetailedInputProps<E> = React.DetailedHTMLProps<React.InputHTMLAttributes<E>, E>;
export type DetailedLabelProps<E> = React.DetailedHTMLProps<React.LabelHTMLAttributes<E>, E>;
export const getObjectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;
