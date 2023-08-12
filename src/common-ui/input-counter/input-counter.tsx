import clsx from 'clsx';
import styles from './input-counter.module.scss';
import { Code } from 'consts/enum';
import { useState } from 'react';

type Props = {
  onValueChange(value: number): void;
  value: number;
};

function InputCounter({
  className,
  onValueChange,
  value,
  ...rest
}: React.ComponentProps<'input'> & Props) {
  const [count, setCount] = useState<number | string>(value);

  const handleCountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value === 0 ? '' : +evt.target.value;
    setCount(value);
    onValueChange(+count);
  };

  const handleCountBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value < 1 ? 1 : +evt.target.value;
    setCount(value);
    onValueChange(value);
  };

  return (
    <input
      {...rest}
      value={count}
      onBlur={handleCountBlur}
      onChange={handleCountChange}
      onKeyDown={(evt) => evt.key === Code.Enter && evt.currentTarget.blur()}
      className={clsx(styles.input, className)}
    />
  );
}

export default InputCounter;
