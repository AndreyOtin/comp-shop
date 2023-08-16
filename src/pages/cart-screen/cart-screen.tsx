import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import styles from './cart-screen.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  finishOrder,
  getPurchased,
  makeOrder,
  selectCartStatus,
  selectOrderStatus,
  selectPurchasedProducts,
  selectUserCart,
  selectUserStatus
} from 'store/user-slice/user-slice';
import CartCard from 'components/cart-card/cart-card';
import { AppRoute, UserStatus } from 'consts/enum';
import { Navigate, useSearchParams } from 'react-router-dom';
import { checkStatus } from 'utils/common';
import ErrorScreen from 'pages/error-screen/error-screen';
import { Backdrop, CircularProgress } from '@mui/material';
import Button from 'common-ui/button/button';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

const stripe = loadStripe(
  'pk_test_51NfTN0GJUcoJ7LcshsL8qS4MDPQLzIwI22eG87ucVRdwt8DUrLYYJpJEZ2VsD8v3uwx44fcfFYtMITSdnWk5hOK100AOrpcfvU'
);

function CartScreen() {
  const cart = useAppSelector(selectUserCart);
  const purchasedProducts = useAppSelector(selectPurchasedProducts);

  const cartStatus = useAppSelector(selectCartStatus);
  const userStatus = useAppSelector(selectUserStatus);
  const orderStatus = useAppSelector(selectOrderStatus);
  const [params, setParams] = useSearchParams({ nav: 'in-cart' });
  const dispatch = useAppDispatch();

  const { isError } = checkStatus({ status: { cartStatus } });
  const { isLoading } = checkStatus({ status: { orderStatus } });

  const nav = params.get('nav') || 'in-cart';

  const products = nav === 'in-cart' ? cart?.cart.items : purchasedProducts;
  const total = products?.reduce((acc, i) => acc + i.totalSum, 0);

  useEffect(() => {
    const secret = params.get('status') || '';

    if (secret && secret !== 'cancel') {
      dispatch(finishOrder(secret)).then(() => {
        setParams({ nav: 'purchased' });
        dispatch(getPurchased());
      });
    }
  }, [params]);

  const handleCheckout = async () => {
    const promise = await stripe;
    const action = await dispatch(makeOrder());

    if (promise && makeOrder.fulfilled.match(action)) {
      await promise.redirectToCheckout({
        sessionId: action.payload
      });
    }
  };

  const handleInCartClick = () => {
    setParams((prev) => ({ ...Object.fromEntries(prev.entries()), nav: 'in-cart' }));
  };
  const handlePurchasedClick = () => {
    setParams((prev) => ({ ...Object.fromEntries(prev.entries()), nav: 'purchased' }));
  };

  if (userStatus === UserStatus.NoAuth) {
    return <Navigate state={AppRoute.Cart} to={AppRoute.Login} />;
  }

  if (userStatus === UserStatus.Unknown) {
    return (
      <main>
        <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    );
  }

  if (isLoading) {
    return (
      <>
        <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
        <main></main>
      </>
    );
  }

  if (isError) {
    return <ErrorScreen variant="error" />;
  }

  return (
    <main className={styles.cart}>
      <div className={styles.container}>
        <Breadcrumbs className={styles.breadcrumbs} />
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles.nav}>
          <Button
            style={{ ...(nav === 'in-cart' && { pointerEvents: 'none' }) }}
            isFilled={nav === 'in-cart'}
            onClick={handleInCartClick}
            disabled={nav === 'in-cart'}
          >
            In cart
          </Button>
          <Button
            style={{ ...(nav !== 'in-cart' && { pointerEvents: 'none' }) }}
            isFilled={nav !== 'in-cart'}
            onClick={handlePurchasedClick}
            disabled={nav !== 'in-cart'}
          >
            Purchased
          </Button>
        </div>
        <div className={styles.content}>
          <table className={styles.productsTable}>
            <thead>
              <tr className={styles.headRow}>
                <th>Items</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {((nav === 'in-cart' && !products?.length) ||
                (nav === 'purchased' && !products?.length)) && (
                <tr className={styles.empty}>
                  <td>Empty</td>
                </tr>
              )}
              {products?.map((i) => (
                <CartCard
                  variant={nav === 'in-cart' ? 'default' : 'purchased'}
                  key={i.transactionId}
                  cartItem={i}
                />
              ))}
            </tbody>
          </table>
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Summary</h2>
            <p className={styles.group}>
              <span className={styles.name}>Total</span>
              <span className={styles.count}>$ {total}</span>
            </p>
            <p className={styles.group}>
              <span className={styles.name}>Tax</span>
              <span className={styles.count}>$ {((total || 0) * 0.03).toFixed(0)}</span>
            </p>
            <p className={styles.group}>
              <span className={styles.name}></span>
              <span className={styles.count}></span>
            </p>
            {nav === 'in-cart' && (
              <>
                <Button
                  className={styles.checkoutBtn}
                  type="button"
                  onClick={handleCheckout}
                  style={{ backgroundColor: '#FFB800', borderColor: '#FFB800', width: '100%' }}
                >
                  Checkout
                </Button>

                <div className={styles.tip}>
                  <p>Credit card number for testing</p>
                  <p>4242 4242 4242 4242</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartScreen;
