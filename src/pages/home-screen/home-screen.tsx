import Promo from 'components/promo/promo';
import NewProducts from 'components/new-products/new-products';
import CustomBuilds from 'components/custom-builds/custom-builds';
import Laptops from 'components/laptops/laptops';
import Desktops from 'components/desktops/desktops';
import Brands from 'components/brands/brands';
import styles from './home-screen.module.scss';
import Reviews from 'components/reviews/reviews';
import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getHomePageProducts, selectProductsStatus } from 'store/products-slice/products-slice';
import { Backdrop, CircularProgress } from '@mui/material';
import { checkStatus } from 'utils/common';
import ErrorScreen from 'pages/error-screen/error-screen';
import { useEffect } from 'react';

function HomeScreen(): JSX.Element {
  const productsStatus = useAppSelector(selectProductsStatus);
  const dispatch = useAppDispatch();
  const { isLoading, isError } = checkStatus({
    status: { productsStatus }
  });

  useEffect(() => {
    dispatch(getHomePageProducts());
  }, []);

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
    <main className={styles.home}>
      <VisuallyHidden>
        <h2 className={styles.test}>Main page</h2>
      </VisuallyHidden>
      <Promo img="img/promo.jpg" />
      <NewProducts />
      <CustomBuilds />
      <Laptops />
      <Desktops />
      <div className={styles.container}>
        <Brands className={styles.brands} />
      </div>
      <Reviews />
    </main>
  );
}

export default HomeScreen;
