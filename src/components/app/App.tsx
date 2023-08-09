import 'index.scss';
import 'scss/global.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import ErrorScreen from '../../pages/error-screen/error-screen';
import HomeScreen from 'pages/home-screen/home-screen';
import Layout from '../layout/Layout';
import { Suspense, lazy } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
const CatalogScreen = lazy(() => import('pages/catalog-screen/catalog-screen'));

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout />}>
        <Route index element={<HomeScreen />} />
        <Route
          path={AppRoute.Catalog}
          element={
            <Suspense
              fallback={
                <>
                  <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <main></main>
                </>
              }
            >
              <CatalogScreen />
            </Suspense>
          }
        />
        <Route path="*" element={<ErrorScreen variant="404" />} />
      </Route>
    </Routes>
  );
}

export default App;
