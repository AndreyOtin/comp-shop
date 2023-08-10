import styles from './button.module.scss';
import clsx from 'clsx';
import { ComponentProps, ElementType } from 'react';

type Props<T extends ElementType> = {
  variant?: 'grey' | 'blue';
  isFilled?: boolean;
  className?: string;
  as?: T;
};

export type ButtonProps<T extends ElementType> = Props<T> & Omit<ComponentProps<T>, keyof Props<T>>;

function Button<T extends ElementType = 'button'>(props: ButtonProps<T>): JSX.Element {
  const { variant = 'blue', isFilled = false, className, as, ...rest } = props;
  const Component = as || 'button';

  return (
    <Component
      className={clsx(styles.button, className, styles[variant], {
        [styles.filled]: isFilled
      })}
      {...rest}
    />
  );
}

export default Button;
