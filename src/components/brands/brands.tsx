import styles from './brands.module.scss';
import clsx from 'clsx';

function Brands({ className }: { className?: string }) {
  return (
    <ul className={clsx(styles.brands, className)}>
      <li className={styles.brand}>
        <img src="img/brands/adata.png" alt="" />
      </li>
      <li className={styles.brand}>
        <img src="img/brands/giga.png" alt="" />
      </li>
      <li className={styles.brand}>
        <img src="img/brands/hp.png" alt="" />
      </li>
      <li className={styles.brand}>
        <img src="img/brands/msi.png" alt="" />
      </li>
      <li className={styles.brand}>
        <img src="img/brands/msi.png" alt="" />
      </li>
      <li className={styles.brand}>
        <img src="img/brands/msi.png" alt="" />
      </li>
      <li className={styles.brand}>
        <img src="img/brands/msi.png" alt="" />
      </li>
    </ul>
  );
}

export default Brands;
