import React from 'react';
import styles from './visually-hidden.module.scss';
import clsx from 'clsx';

function VisuallyHidden({ children, ...rest }: { children: JSX.Element }) {
  return React.cloneElement(children, {
    className: clsx(children.props.className, styles.visuallyHidden),
    ...rest
  });
}

export default VisuallyHidden;
