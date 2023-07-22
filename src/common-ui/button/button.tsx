import styles from './button.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ButtonElement from 'common-ui/dom-elements/button-element';

type ButtonProps = {
  variant?: 'grey' | 'blue';
  href?: string;
  isFilled?: boolean;
  className: string;
  children: React.ReactNode;
};

function Button({
  variant = 'blue',
  isFilled = false,
  className,
  children,
  href,
  ...rest
}: ButtonProps): JSX.Element {
  const Element = href ? Link : ButtonElement;

  return href ? (
    <Link
      to={href}
      className={clsx(styles.button, className, {
        [styles.grey]: variant === 'grey',
        [styles.blue]: variant === 'blue',
        [styles.filled]: isFilled
      })}
      {...rest}
    >
      {children}
    </Link>
  ) : (
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
