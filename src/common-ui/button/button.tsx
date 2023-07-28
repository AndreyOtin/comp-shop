import styles from './button.module.scss';
import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';
import { ComponentProps } from 'react';

type AnchorProps = {
  href: string;
  variant?: 'grey' | 'blue';
  isFilled?: boolean;
} & LinkProps;

type ButtonProps = {
  variant?: 'grey' | 'blue';
  isFilled?: boolean;
} & ComponentProps<'button'>;

type Props = AnchorProps | ButtonProps;

function Button(props: Props): JSX.Element {
  const { variant = 'blue', isFilled = false, className, children, ...rest } = props;

  if ('href' in rest) {
    return (
      <Link
        className={clsx(styles.button, className, {
          [styles.grey]: variant === 'grey',
          [styles.blue]: variant === 'blue',
          [styles.filled]: isFilled
        })}
        {...rest}
        to={rest.href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
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
