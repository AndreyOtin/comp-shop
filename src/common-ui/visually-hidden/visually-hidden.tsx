import React, { ReactElement } from 'react';
import styles from './visually-hidden.module.scss';
import clsx from 'clsx';

function VisuallyHidden({ children }: { children: ReactElement | ReactElement[] }) {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          className: clsx(child.props.className, styles.visuallyHidden)
        })
      )}
    </>
  );
}

export default VisuallyHidden;
