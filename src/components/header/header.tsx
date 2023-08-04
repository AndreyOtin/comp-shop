import WorkingOurs from 'components/working-hours/working-ours';
import styles from './header.module.scss';
import { ReactComponent as MenuIcon } from 'assets/icons/menu-icon.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CartIcon } from 'assets/icons/cart.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user-icon.svg';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Crest } from 'assets/icons/crest.svg';
import { Drawer, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import Menu from 'components/menu/menu';
import useResponsive from 'hooks/use-responsive';
import clsx from 'clsx';
import Socials from 'components/socials/socials';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getCategories, getTypes, selectProductStatus } from 'store/products-slice/products-slice';
import { checkStatus } from 'utils/common';

type HeaderProps = {};

function Header(props: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [isMenuOpened, showMenu] = useState(false);
  const { atMinPC } = useResponsive();
  const [search, setSearch] = useState(false);
  const productsStatus = useAppSelector(selectProductStatus);
  const { isError } = checkStatus({ status: { productsStatus } });

  useEffect(() => {
    dispatch(getCategories({ isProducts: true }));
    dispatch(getTypes({ isProducts: true }));
  }, []);

  const topMenu = (
    <div className={styles.topMenu}>
      <div className={styles.container}>
        <WorkingOurs className={styles.popoverButton} />
        <div className={styles.addressContainer}>
          <p className={styles.address}>
            Visit our showroom in 1234 Street Adress City Address, 1234{' '}
          </p>
          <a className={styles.contactLink}>Contact Us</a>
        </div>
        <div className={styles.socialContainer}>
          <p>
            Call Us: <a href="tel:(00) 1234 5678">(00) 1234 5678</a>
          </p>
          <Socials />
        </div>
      </div>
    </div>
  );

  const middleMenu = (
    <div className={styles.middleMenu}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
        </div>

        {!atMinPC && (
          <button onClick={() => showMenu(true)} className={styles.menuIcon}>
            <MenuIcon />
          </button>
        )}

        <form className={clsx(styles.search, search && styles.searchActive)}>
          <SearchIcon />
          <input placeholder="search here" type="search" />
        </form>

        {atMinPC && <Menu variant="pc" />}
        <div className={styles.userContainer}>
          {atMinPC && (
            <button onClick={() => setSearch(!search)} className={styles.searchButton}>
              {!search && <SearchIcon />}
              {search && <Crest />}
            </button>
          )}
          <div className={styles.cart}>
            <span className={styles.productCount}>5</span>
            <CartIcon className={styles.cartIcon} />
          </div>
          <div className={styles.user}>
            <UserIcon className={styles.userIcon} />
            <img className={styles.userAvatar} src="" alt="user avatar" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header className={styles.header}>
      {topMenu}
      {middleMenu}
      <Drawer
        className={styles.modal}
        anchor="left"
        open={isMenuOpened}
        onClose={() => showMenu(false)}
      >
        <div className={styles.bottomMenu}>
          <div className={styles.container}>
            <div className={styles.bottomHeader}>
              <Logo className={clsx(styles.logo, styles.blue)} />
              <button onClick={() => showMenu(false)} className={styles.close}>
                <Crest />
              </button>
            </div>
            {!isError && <Menu />}
          </div>
        </div>
      </Drawer>
    </header>
  );
}

export default Header;
