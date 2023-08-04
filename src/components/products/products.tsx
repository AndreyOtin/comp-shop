import SectionHeader from 'components/section-header/section-header';
import styles from './products.module.scss';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import ProductCard from 'components/product-card/product-card';
import { createRandomElementsArray } from 'utils/common';
import { MaxElementCount } from 'consts/enum';
import { Product } from 'types/product';

type ProductsProps = {
  className?: string;
  children?: ReactNode;
  renderSectionHeader: (Component: typeof SectionHeader) => JSX.Element;
  types: { id: number; type: string }[];
  products: Product[];
};

function Products(props: ProductsProps) {
  const twoCards = useMediaQuery({ query: `(min-width: ${720}px) and (max-width: ${976}px)` });
  const threeCards = useMediaQuery({ query: `(min-width: ${976}px) and (max-width: ${1200}px)` });
  const fourCards = useMediaQuery({ query: `(min-width: ${1200}px) and (max-width: ${1460}px)` });
  const fiveCards = useMediaQuery({ query: `(min-width: ${1460}px)` });
  const [typeId, setTypeId] = useState(0);

  let maxCardCount = 1;
  if (twoCards) {
    maxCardCount = 2;
  } else if (threeCards) {
    maxCardCount = 3;
  } else if (fourCards) {
    maxCardCount = 4;
  } else if (fiveCards) {
    maxCardCount = 5;
  }

  const filteredProducts = typeId
    ? props.products.filter((p) => p.type.id === typeId)
    : props.products;
  const randomElements = createRandomElementsArray(filteredProducts, maxCardCount);

  return (
    <section className={clsx(styles.products, props.className)}>
      <div className={styles.container}>
        {!!props.types.length && (
          <ul className={styles.productTypesList}>
            {props.types.map((item) => (
              <li key={item.id} className={styles.productType}>
                <button
                  onClick={() => setTypeId(item.id)}
                  className={clsx(styles.typeButton, typeId === item.id && styles.active)}
                >
                  {item.type}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.body}>
          {props.renderSectionHeader(SectionHeader)}
          <ul className={styles.productsList}>
            {randomElements.map((p) => (
              <ProductCard key={p.id} product={p} elementVariant="li" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Products;
