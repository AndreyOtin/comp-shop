import clsx from 'clsx';
import styles from './input-counter.module.scss';
import { Code } from 'consts/enum';
import { ChangeEvent, ComponentProps, KeyboardEvent, useState } from 'react';
import { callAll } from 'utils/common';

const useInputNumberChange = (value: number) => {
  const [count, setCount] = useState<number | string>(value);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value === 0 ? '' : +evt.target.value;
    setCount(value);
  };

  const onBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value < 1 ? 1 : +evt.target.value;
    setCount(value);
  };

  return { value: count, onChange, onBlur };
};

function inputCounter({ className, onKeyDown, ...rest }: ComponentProps<'input'>) {
  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) =>
    evt.key === Code.Enter && evt.currentTarget.blur();

  return (
    <input
      {...rest}
      onKeyDown={callAll(onKeyDown, handleKeyDown)}
      className={clsx(styles.input, className)}
    />
  );
}

const InputCounter = Object.assign(inputCounter, {
  useInputNumberChange
});

export default InputCounter;
