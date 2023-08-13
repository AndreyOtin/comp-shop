import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import styles from './cart-screen.module.scss';
import { useAppSelector } from 'hooks/hooks';
import { selectCartStatus, selectUserCart, selectUserStatus } from 'store/user-slice/user-slice';
import CartCard from 'components/cart-card/cart-card';
import { AppRoute, UserStatus } from 'consts/enum';
import { Navigate } from 'react-router-dom';
import { checkStatus } from 'utils/common';
import ErrorScreen from 'pages/error-screen/error-screen';
import { Backdrop, CircularProgress } from '@mui/material';

function CartScreen() {
  const cart = useAppSelector(selectUserCart);
  const cartStatus = useAppSelector(selectCartStatus);
  const userStatus = useAppSelector(selectUserStatus);

  const { isError } = checkStatus({ status: { cartStatus } });

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

  if (isError) {
    return <ErrorScreen variant="error" />;
  }

  return (
    <main className={styles.cart}>
      <div className={styles.container}>
        <Breadcrumbs className={styles.breadcrumbs} />
        <h1 className={styles.title}>Shopping Cart</h1>
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
            {!cart?.cart.items.length && (
              <tr className={styles.empty}>
                <td>Empty</td>
              </tr>
            )}
            {cart?.cart.items.map((i) => (
              <CartCard key={i.transactionId} cartItem={i} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default CartScreen;
