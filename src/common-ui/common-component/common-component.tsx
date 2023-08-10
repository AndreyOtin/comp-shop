import { ElementType, ComponentProps } from 'react';

type Props<T extends ElementType> = {
  as: T;
};

export type CommonComponentProps<T extends ElementType> = Props<T> &
  Omit<ComponentProps<T>, keyof Props<T>>;

function CommonComponent<T extends ElementType>({ as, ...rest }: CommonComponentProps<T>) {
  const Component = as;
  return <Component {...(rest as ComponentProps<T>)} />;
}

export default CommonComponent;
