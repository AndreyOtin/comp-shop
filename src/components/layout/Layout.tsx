import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import clsx from 'clsx';
import { useDarkModeContext } from 'context/dark-mode-context';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';

function Layout() {
  const { darkMode } = useDarkModeContext();

  return (
    <div
      className={clsx({
        'theme-dark': darkMode,
        'theme-light': !darkMode
      })}
    >
      <div className={clsx(styles.wrapper, 'wrapper')}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
