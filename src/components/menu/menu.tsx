import { useState, RefObject, useEffect, useRef } from 'react';
import styles from './menu.module.scss';
import { ReactComponent as SmallArrow } from 'assets/icons/small-arrow.svg';
import clsx from 'clsx';
import ProductCard from 'components/product-card/product-card';
import { useAppSelector, useClickOutside } from 'hooks/hooks';
import Brands from 'components/brands/brands';
import { selectCategories } from 'store/products-slice/products-slice';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute, SearchParams } from 'consts/enum';

type MenuProps = {
  variant?: 'pc' | 'mobile';
  onClose?: () => void;
};

function Menu({ variant = 'mobile', onClose }: MenuProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [submenu, setSubmenu] = useState<string | null>(null);
  useClickOutside(ref, () => setSubmenu(null));
  const categories = useAppSelector(selectCategories);

  const mobileMenu = (
    <ul className={styles.menu}>
      {categories.map(
        (el) =>
          (!submenu || submenu === el.name) && (
            <li key={el.name} className={styles.menuItem}>
              <div className={styles.menuGroup}>
                {submenu !== el.name ? (
                  <>
                    <Link
                      onClick={onClose}
                      to={generatePath(AppRoute.Catalog, {
                        category: el.name.split(' ').join('-'),
                        type: ''
                      })}
                      className={styles.menuLink}
                    >
                      {el.name}
                    </Link>
                    <button onClick={() => setSubmenu(el.name)} className={styles.nextButton}>
                      <SmallArrow />
                    </button>
                  </>
                ) : (
                  <button onClick={() => setSubmenu(null)} className={styles.nextButton}>
                    <SmallArrow className={clsx(submenu === el.name && styles.arrowActive)} />
                    {el.name}
                  </button>
                )}
              </div>
              {submenu === el.name && (
                <ul className={clsx(styles.menu, styles.submenu)}>
                  {el.types.map((type) => (
                    <li key={type.id} className={styles.menuItem}>
                      <div className={styles.menuGroup}>
                        <Link
                          onClick={onClose}
                          to={`${generatePath(AppRoute.Catalog, {
                            category: el.name.split(' ').join('-'),
                            type: type.name.split(' ').join('-')
                          })}`}
                          className={styles.menuLink}
                        >
                          {type.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
      )}
    </ul>
  );

  const pcMenu = (
    <ul ref={ref} className={clsx(styles.menu, styles.pcMenu)}>
      {categories.map((el) => (
        <li onMouseEnter={() => setSubmenu(el.name)} key={el.name} className={styles.name}>
          <div className={styles.menuGroup}>
            <Link
              onClick={() => document.body.click()}
              to={generatePath(AppRoute.Catalog, {
                category: el.name.split(' ').join('-'),
                type: ''
              })}
              className={clsx(styles.menuLink, submenu === el.name && styles.active)}
            >
              {el.name}
            </Link>
          </div>
          {submenu === el.name && (
            <div className={styles.menuWrapper}>
              <div className={styles.top}>
                <ul className={clsx(styles.menu, styles.submenu)}>
                  {el.types.map((type) => (
                    <li key={type.id} className={styles.menuItem}>
                      <div className={styles.menuGroup}>
                        <Link
                          onClick={() => document.body.click()}
                          to={`${generatePath(AppRoute.Catalog, {
                            category: el.name.split(' ').join('-'),
                            type: type.name.split(' ').join('-')
                          })}`}
                          className={styles.menuLink}
                        >
                          {type.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className={styles.productsList}>
                  {el.products.slice(0, 3).map((p) => (
                    <ProductCard key={p.id} product={p} elementVariant="li" />
                  ))}
                </ul>
              </div>
              <Brands />
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return variant === 'mobile' ? mobileMenu : pcMenu;
}

export default Menu;
