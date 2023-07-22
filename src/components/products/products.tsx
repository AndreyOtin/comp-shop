import SectionHeader from 'components/section-header/section-header';
import styles from './products.module.scss';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';

type ProductsProps = {
  className?: string;
  children: ReactNode;
  renderSectionHeader: (Component: typeof SectionHeader) => JSX.Element;
  types: { id: number; type: string }[];
};

function Products(props: ProductsProps) {
  const [type, setType] = useState('');

  return (
    <section className={clsx(styles.products, props.className)}>
      <div className={styles.container}>
        {!!props.types.length && (
          <ul className={styles.productTypesList}>
            {props.types.map((item) => (
              <li key={item.id} className={styles.productType}>
                <button
                  onClick={() => setType(item.type)}
                  className={clsx(styles.typeButton, type === item.type && styles.active)}
                >
                  {item.type}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.body}>
          {props.renderSectionHeader(SectionHeader)}
          <ul className={styles.productsList}>{props.children}</ul>
        </div>
      </div>
    </section>
  );
}

export default Products;
