import React from 'react';
import styles from './socials.module.scss';
import { ReactComponent as Fb } from 'assets/icons/fb.svg';
import { ReactComponent as Inst } from 'assets/icons/inst.svg';
import clsx from 'clsx';

type SocialsProps = {
  variant?: 'header' | 'footer';
};

function Socials({ variant = 'header' }: SocialsProps) {
  return (
    <ul className={styles.socialList}>
      <li className={clsx(styles.socialItem, styles[variant])}>
        <a href="#">
          <Fb />
        </a>
      </li>
      <li className={clsx(styles.socialItem, styles[variant])}>
        <a href="#">
          <Inst />
        </a>
      </li>
    </ul>
  );
}

export default Socials;
