import clsx from 'clsx';
import styles from './input-counter.module.scss';
import { Code } from 'consts/enum';

function InputCounter({ className, ...rest }: React.ComponentProps<'input'>) {
  return (
    <input
      onKeyDown={(evt) => evt.key === Code.Enter && evt.currentTarget.blur()}
      className={clsx(styles.input, className)}
      {...rest}
    />
  );
}

export default InputCounter;
