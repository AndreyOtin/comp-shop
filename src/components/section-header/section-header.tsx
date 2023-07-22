import clsx from 'clsx';
import styles from './section-header.module.scss';

type SectionHeaderProps<variant = 'withImage' | 'default'> = variant extends 'default'
  ? {
      variant?: 'default';
      title: string;
      linkText: string;
    }
  : {
      variant?: 'withImage';
      imageSrc: string;
      title: string;
      linkText: string;
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
      <a href="#" className={styles.allLink}>
        {props.linkText}
      </a>
    </header>
  );
}

export default SectionHeader;
