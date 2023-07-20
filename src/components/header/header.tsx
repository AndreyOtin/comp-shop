import WorkingOurs from 'components/working-hours/working-ours';
import styles from './header.module.scss';
import { ReactComponent as Fb } from 'assets/icons/fb.svg';
import { ReactComponent as Inst } from 'assets/icons/inst.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu-icon.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CartIcon } from 'assets/icons/cart.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user-icon.svg';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Crest } from 'assets/icons/crest.svg';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import Menu from 'components/menu/menu';
import useResponsive from 'hooks/use-responsive';

type HeaderProps = {};

function Header(props: HeaderProps): JSX.Element {
  const [isMenuOpened, showMenu] = useState(false);
  const { atMinPC } = useResponsive();

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
          <ul className={styles.socialList}>
            <li className={styles.socialItem}>
              <a href="#">
                <Fb />
              </a>
            </li>
            <li className={styles.socialItem}>
              <a href="#">
                <Inst />
              </a>
            </li>
          </ul>
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

        <form className={styles.search}>
          <SearchIcon />
          <input placeholder="search here" type="search" />
        </form>
        {atMinPC && <Menu variant="pc" />}
        <div className={styles.userContainer}>
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
              <Logo className={styles.logo} />
              <button onClick={() => showMenu(false)} className={styles.close}>
                <Crest />
              </button>
            </div>
            <Menu />
          </div>
        </div>
      </Drawer>
    </header>
  );
}

export default Header;
