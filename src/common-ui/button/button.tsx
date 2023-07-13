import { DetailedButtonProps } from 'utils/types';
import styles from './button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  variant?: 'grey' | 'blue';
  isFilled?: boolean;
} & DetailedButtonProps<HTMLButtonElement>;

function Button({
  variant = 'blue',
  isFilled = false,
  className,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.grey]: variant === 'grey',
        [styles.blue]: variant === 'blue',
        [styles.filled]: isFilled
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
