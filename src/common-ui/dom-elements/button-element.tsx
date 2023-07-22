import { DetailedButtonProps } from 'utils/types';

function ButtonElement({ children, ...rest }: DetailedButtonProps<HTMLButtonElement>) {
  return <button {...rest}>{children}</button>;
}

export default ButtonElement;
