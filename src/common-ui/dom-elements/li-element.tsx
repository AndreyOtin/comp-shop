import { ReactNode } from 'react';
import { DetailedProps } from 'utils/types';

function LiElement({ children, ...rest }: DetailedProps<HTMLLIElement>) {
  return <li {...rest}>{children}</li>;
}

export default LiElement;
