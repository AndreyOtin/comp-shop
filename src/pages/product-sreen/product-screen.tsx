import Button from 'common-ui/button/button';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchParams, Status, UserStatus } from 'consts/enum';
import clsx from 'clsx';
import { getObjectKeys, getObjectValues } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  getProduct,
  selectProduct,
  selectProductStatus
} from 'store/products-slice/products-slice';
import { useEffect, useState } from 'react';
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import { checkStatus, makeFirstLetterUpperCase } from 'utils/common';
import Image from 'common-ui/image/image';
import { Backdrop, CircularProgress } from '@mui/material';
import ErrorScreen from 'pages/error-screen/error-screen';
import {
  addToCart,
  selectCartStatus,
  selectUserCart,
  selectUserStatus
} from 'store/user-slice/user-slice';
import styles from './product-screen.module.scss';
import InputCounter from 'common-ui/input-counter/input-counter';

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
  const productStatus = useAppSelector(selectProductStatus);
  const userStatus = useAppSelector(selectUserStatus);
  const cart = useAppSelector(selectUserCart);
  const cartStatus = useAppSelector(selectCartStatus);

  const [count, setCount] = useState(1);

  const inCart = Boolean(productId && cart?.cart.items.some((i) => i.product.id === +productId));

  const { isError, isLoading } = checkStatus({ status: { productStatus } });

  useEffect(() => {
    if (!productId) {
      return;
    }

    dispatch(getProduct({ id: productId }));
  }, [productId]);

  const handleCountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setCount(+value < 1 ? 1 : +value);
  };

  if (isLoading) {
    return (
      <main>
        <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    );
  }

  if (isError) {
    return <ErrorScreen variant="error" />;
  }

  if (!product) {
    return <ErrorScreen variant="404" />;
  }

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

          {userStatus === UserStatus.Auth && (
            <div className={styles.cartNavigation}>
              <span className={styles.price}>
                $ {product.newPrice ? product.newPrice : product.price}
              </span>
              <InputCounter
                onChange={(evt) => handleCountChange(evt)}
                type="number"
                value={count}
              />
              <Button
                variant={inCart ? 'inCart' : 'blue'}
                onClick={() => dispatch(addToCart({ productId: product.id, count }))}
              >
                {cartStatus === Status.Loading ? (
                  <CircularProgress style={{ width: '20px', height: '20px' }} color="inherit" />
                ) : (
                  'Add to Cart'
                )}
              </Button>
              <Button style={{ backgroundColor: '#FFB800', borderColor: '#FFB800' }}>
                Pay pal
              </Button>
            </div>
          )}
        </header>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.productContent}>
            <Breadcrumbs className={styles.breadcrumbs} product={product?.details.cpu} />

            {currentNav === ProductNav.About && <p className={styles.about}>{product?.name}</p>}

            {currentNav === ProductNav.Details && (
              <ul className={styles.details}>
                {getObjectValues(product?.details || {}).map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}

            {currentNav === ProductNav.Specs && (
              <dl className={styles.spec}>
                {getObjectKeys(product?.spec || {}).map((d) => (
                  <div key={d} className={styles.group}>
                    <dt>{makeFirstLetterUpperCase(d)}</dt>
                    <dd>{product?.spec[d]}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
        <div className={styles.rightColumn}>
          <Image
            className={styles.image}
            img={product?.imageLarge || ''}
            alt={product?.details.cpu || ''}
          />
        </div>
      </div>
    </main>
  );
}

export default ProductScreen;
