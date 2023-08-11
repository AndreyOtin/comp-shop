import clsx from 'clsx';
import styles from './input-counter.module.scss';

function InputCounter({ className, ...rest }: React.ComponentProps<'input'>) {
  return <input className={clsx(styles.input, className)} {...rest} />;
}

export default InputCounter;
