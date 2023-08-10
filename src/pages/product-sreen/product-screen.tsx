import { orange } from '@mui/material/colors';
import Button from 'common-ui/button/button';
import styles from './product-screen.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchParams } from 'consts/enum';
import clsx from 'clsx';
import { getObjectKeys, getObjectValues } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getProduct, selectProduct } from 'store/products-slice/products-slice';
import { useEffect } from 'react';
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';

enum ProductNav {
  About = 'About Product',
  Specs = 'Specs',
  Details = 'Details'
}

function ProductScreen() {
  const [params, setParams] = useSearchParams();
  const { product: productId } = useParams();
  const currentNav = params.get(SearchParams.ProductNav) || ProductNav.About;
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);

  console.log(product);

  useEffect(() => {
    if (!productId) {
      return;
    }

    dispatch(getProduct({ id: productId }));
  }, []);

  return (
    <main className={styles.productSrceen}>
      <div className={styles.container}>
        <header className={styles.header}>
          <ul className={styles.productNavigation}>
            {getObjectValues(ProductNav).map((item) => (
              <li key={item} className={styles.navItem}>
                <button
                  onClick={() =>
                    setParams((prev) => {
                      prev.set(SearchParams.ProductNav, item);
                      return prev;
                    })
                  }
                  className={clsx(styles.navButton, currentNav === item && styles.isActive)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.cartNavigation}>
            <span className={styles.price}>$ 1000</span>
            <input className={styles.input} type="number" defaultValue={1} />
            <Button>Add to Cart</Button>
            <Button style={{ backgroundColor: '#FFB800', borderColor: '#FFB800' }}>Pay pal</Button>
          </div>
        </header>
        <Breadcrumbs product={product?.name} />
      </div>
    </main>
  );
}

export default ProductScreen;
