import React, { ReactElement } from 'react';
import styles from './visually-hidden.module.scss';
import clsx from 'clsx';

function VisuallyHidden({ children, ...rest }: { children: ReactElement }) {
  return React.cloneElement(children, {
    className: clsx(children.props.className, styles.visuallyHidden),
    ...rest
  });
}

export default VisuallyHidden;
