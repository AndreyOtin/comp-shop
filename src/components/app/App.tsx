import 'index.scss';
import 'scss/global.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import ErrorScreen from '../../pages/error-screen/error-screen';
import HomeScreen from 'pages/home-screen/home-screen';
import Layout from '../layout/Layout';
import { Suspense, lazy } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import CartScreen from 'pages/cart-screen/cart-screen';

const CatalogScreen = lazy(() => import('pages/catalog-screen/catalog-screen'));
const ProductScreen = lazy(() => import('pages/product-sreen/product-screen'));
const LoginScreen = lazy(() => import('pages/login-screen/login-screen'));

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout />}>
        <Route path="/home" element={<Navigate replace to={AppRoute.Root} />} />
        <Route index element={<HomeScreen />} />
        <Route
          path={AppRoute.Catalog}
          element={
            <Suspense
              fallback={
                <main>
                  <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </main>
              }
            >
              <CatalogScreen />
            </Suspense>
          }
        />
        <Route
          path={AppRoute.Product}
          element={
            <Suspense
              fallback={
                <main>
                  <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </main>
              }
            >
              <ProductScreen />
            </Suspense>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <Suspense
              fallback={
                <main>
                  <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </main>
              }
            >
              <LoginScreen />
            </Suspense>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <Suspense
              fallback={
                <main>
                  <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </main>
              }
            >
              <LoginScreen />
            </Suspense>
          }
        />
        <Route
          path={AppRoute.Cart}
          element={
            <Suspense
              fallback={
                <main>
                  <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </main>
              }
            >
              <CartScreen />
            </Suspense>
          }
        />
        <Route path="*" element={<ErrorScreen variant="404" />} />
      </Route>
    </Routes>
  );
}

export default App;
