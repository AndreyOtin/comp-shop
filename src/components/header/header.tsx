import WorkingOurs from 'components/working-hours/working-ours';
import styles from './header.module.scss';
import { ReactComponent as MenuIcon } from 'assets/icons/menu-icon.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CartIcon } from 'assets/icons/cart.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user-icon.svg';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Crest } from 'assets/icons/crest.svg';
import { Drawer } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import Menu from 'components/menu/menu';
import useResponsive from 'hooks/use-responsive';
import clsx from 'clsx';
import Socials from 'components/socials/socials';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  getCategories,
  getProductsForSearch,
  getTypes,
  selectProductsForSearch,
  selectProductsStatus
} from 'store/products-slice/products-slice';
import { checkStatus, filterArrayByString } from 'utils/common';
import { AppRoute, Code, UserStatus } from 'consts/enum';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { logOut, selectUserCart, selectUserStatus } from 'store/user-slice/user-slice';
import { Product } from 'types/product';
import UseArrowNavigation from 'hooks/use-arrow-navigation';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { atMinPC } = useResponsive();
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const ref = useRef(null);
  const resetArrowNav = UseArrowNavigation(searchRef, ref);

  const [isMenuOpened, showMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searcString, setSearcString] = useState('');

  const productsStatus = useAppSelector(selectProductsStatus);
  const userStatus = useAppSelector(selectUserStatus);
  const cart = useAppSelector(selectUserCart);
  const productsForSearch = useAppSelector(selectProductsForSearch);

  const { isError } = checkStatus({ status: { productsStatus } });

  const productsCount = useMemo(
    () => cart && cart.cart.items.reduce((acc, p) => acc + p.count, 0),
    [cart]
  );

  const searchResult = useMemo(
    () => filterArrayByString(productsForSearch, searcString),
    [searcString, productsForSearch]
  );

  useEffect(() => {
    dispatch(getProductsForSearch());
    dispatch(getCategories({ isProducts: true }));
    dispatch(getTypes({ isProducts: true }));
  }, []);

  const handleNavigation = (product: Product) => {
    navigate(generatePath(AppRoute.Product, { category: '', product: product.id.toString() }));
    setSearcString('');
    resetArrowNav();
  };

  const onSearcnButtonClick = () => {
    setSearch(!search);
    setSearcString('');
    resetArrowNav();
  };

  const onResultClick = (product: Product) => {
    handleNavigation(product);
  };

  const onResultKeyDown = (evt: React.KeyboardEvent<HTMLLIElement>, product: Product) => {
    if (evt.code === Code.Enter) {
      handleNavigation(product);
    }
  };

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
      <div className={[styles.container, styles.middleContainer].join(' ')}>
        <div className={styles.logoWrapper}>
          <Link to={AppRoute.Root}>
            <Logo className={styles.logo} />
          </Link>
        </div>

        {!atMinPC && (
          <button onClick={() => showMenu(true)} className={styles.menuIcon}>
            <MenuIcon />
          </button>
        )}

        <form
          onSubmit={(evt) => evt.preventDefault()}
          className={clsx(styles.search, {
            [styles.searchActive]: search,
            [styles.isActive]: searchResult.length
          })}
        >
          <SearchIcon />
          <input
            ref={searchRef}
            placeholder="search here"
            type="search"
            value={searcString}
            onChange={(evt) => setSearcString(evt.target.value)}
          />
          <ul
            ref={ref}
            aria-label="search-results"
            className={clsx(styles.searchResults, searchResult.length && styles.isActive)}
          >
            {searchResult.map((r) => (
              <li
                onKeyDown={(evt) => onResultKeyDown(evt, r)}
                onClick={() => onResultClick(r)}
                tabIndex={0}
                key={r.id}
              >
                {r.name}
              </li>
            ))}
          </ul>
        </form>

        {atMinPC && <Menu variant="pc" />}

        <div className={styles.userContainer}>
          {atMinPC && (
            <button onClick={onSearcnButtonClick} className={styles.searchButton}>
              {!search && <SearchIcon />}
              {search && <Crest />}
            </button>
          )}
          {userStatus === UserStatus.Auth ? (
            <>
              <Link to={AppRoute.Cart}>
                <div className={styles.cart}>
                  <span className={styles.productCount}>{productsCount || 0}</span>
                  <CartIcon className={styles.cartIcon} />
                </div>
              </Link>
              <Link to={AppRoute.Cart}>
                <div className={styles.user}>
                  <UserIcon className={styles.userIcon} />
                  <img className={styles.userAvatar} src="" alt="user avatar" />
                </div>
              </Link>
              <button
                onClick={() => {
                  dispatch(logOut());
                }}
                className={styles.singin}
              >
                {' '}
                Sign out
              </button>
            </>
          ) : (
            <Link
              state={location.pathname}
              className={styles.singin}
              to={generatePath(AppRoute.Login)}
            >
              Sign in
            </Link>
          )}
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
            {!isError && <Menu onClose={() => showMenu(false)} />}
          </div>
        </div>
      </Drawer>
    </header>
  );
}

export default Header;
