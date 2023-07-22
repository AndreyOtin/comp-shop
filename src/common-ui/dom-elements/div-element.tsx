import { DetailedProps } from 'utils/types';

function DivElement({ children, ...rest }: DetailedProps<HTMLDivElement>) {
  return <div {...rest}>{children}</div>;
}

export default DivElement;
