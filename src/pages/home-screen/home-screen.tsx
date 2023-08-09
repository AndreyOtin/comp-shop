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
import { getHomePageProducts, selectProductStatus } from 'store/products-slice/products-slice';
import { Backdrop, CircularProgress } from '@mui/material';
import { checkStatus } from 'utils/common';
import ErrorScreen from 'pages/error-screen/error-screen';
import { useEffect } from 'react';

type HomeScreenProps = {};

function HomeScreen(props: HomeScreenProps): JSX.Element {
  const productsStatus = useAppSelector(selectProductStatus);
  const { isLoading, isError } = checkStatus({
    status: { productsStatus }
  });
  const dispatch = useAppDispatch();

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
