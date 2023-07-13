import 'index.scss';
import 'scss/global.module.scss';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import ErrorScreen from '../../pages/error-screen/ErrorScreen';
import HomeScreen from 'pages/home-screen/HomeScreen';
import Layout from '../layout/Layout';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout />}>
        <Route index element={<HomeScreen />} />
      </Route>
      <Route path="*" element={<ErrorScreen variant="404" />} />
    </Routes>
  );
}

export default App;
