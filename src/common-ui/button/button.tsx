import styles from './button.module.scss';
import clsx from 'clsx';
import { ComponentProps, ElementType } from 'react';

type Props<T extends ElementType> = {
  variant?: 'grey' | 'blue' | 'inCart';
  isFilled?: boolean;
  className?: string;
  as?: T;
};

export type ButtonProps<T extends ElementType> = Props<T> & Omit<ComponentProps<T>, keyof Props<T>>;

function Button<T extends ElementType = 'button'>(props: ButtonProps<T>): JSX.Element {
  const { variant = 'blue', isFilled = false, className, as, children, ...rest } = props;
  const Component = as || 'button';

  return (
    <Component
      className={clsx(styles.button, className, styles[variant], {
        [styles.filled]: isFilled
      })}
      {...rest}
    >
      {variant === 'inCart' ? 'In cart' : children}
    </Component>
  );
}

export default Button;
