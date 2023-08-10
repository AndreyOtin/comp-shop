import clsx from 'clsx';
import styles from './section-header.module.scss';
import { Link } from 'react-router-dom';
import { memo } from 'react';

type SectionHeaderProps<variant = 'withImage' | 'default'> = variant extends 'default'
  ? {
      variant?: 'default';
      title: string;
      linkText: string;
      to: string;
    }
  : {
      variant?: 'withImage';
      imageSrc: string;
      title: string;
      linkText: string;
      to: string;
    };

function SectionHeader(props: SectionHeaderProps) {
  return (
    <header className={clsx(styles.header, styles[props.variant || ''])}>
      {props.variant === 'withImage' && (
        <div className={styles.ibg}>
          <img src={props.imageSrc} alt="photo" />
        </div>
      )}
      <h2 className={styles.title}>{props.title}</h2>
      <Link to={props.to} className={styles.allLink}>
        {props.linkText}
      </Link>
    </header>
  );
}

export default memo(SectionHeader);
