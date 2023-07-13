import clsx from 'clsx';
import { DetailedProps } from 'utils/types';
import { ReactComponent as InStock } from 'assets/icons/check-mark.svg';
import { ReactComponent as OutOfStock } from 'assets/icons/phone-check-mark.svg';
import styles from './placeholder.module.scss';

type Props = {
  children?: React.ReactNode;
  variant?: 'inStock' | 'outOfStock';
} & DetailedProps<HTMLParagraphElement>;

function Placeholder(props: Props): JSX.Element {
  const { children, variant = 'inStock', className, ...rest } = props;

  return (
    <p
      className={clsx(styles.placeholder, className, {
        [styles.inStock]: variant === 'inStock',
        [styles.outOfStock]: variant === 'outOfStock'
      })}
      {...rest}
    >
      {variant === 'inStock' ? <InStock /> : <OutOfStock />}
      {variant === 'inStock' ? 'in stock' : 'check availability'}
      {children}
    </p>
  );
}

export default Placeholder;
