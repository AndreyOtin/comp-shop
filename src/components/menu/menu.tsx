import { useState, RefObject, useEffect, useRef } from 'react';
import styles from './menu.module.scss';
import { ReactComponent as SmallArrow } from 'assets/icons/small-arrow.svg';
import clsx from 'clsx';
import ProductCard from 'components/product-card/product-card';
import { useClickOutside } from 'hooks/hooks';
import Brands from 'components/brands/brands';

const mocks = [
  {
    'category': 'Laptops',
    'types': [
      {
        'id': 3,
        'type': 'Prestige Series'
      },
      {
        'id': 4,
        'type': 'Gaming'
      },
      {
        'id': 2,
        'type': 'Workstation'
      },
      {
        'id': 1,
        'type': 'Everyday Use'
      }
    ]
  },
  {
    'category': 'Desktop PCs',
    'types': [
      {
        'id': 4,
        'type': 'Gaming'
      },
      {
        'id': 3,
        'type': 'Prestige Series'
      },
      {
        'id': 2,
        'type': 'Workstation'
      },
      {
        'id': 1,
        'type': 'Everyday Use'
      }
    ]
  }
];

type MenuProps = {
  variant?: 'pc' | 'mobile';
};

function Menu({ variant = 'mobile' }: MenuProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [submenu, setSubmenu] = useState<string | null>(null);
  useClickOutside(ref, () => setSubmenu(null));

  const mobileMenu = (
    <ul className={styles.menu}>
      {mocks.map(
        (el) =>
          (!submenu || submenu === el.category) && (
            <li key={el.category} className={styles.menuItem}>
              <div className={styles.menuGroup}>
                {submenu !== el.category ? (
                  <>
                    <a href="#" className={styles.menuLink}>
                      {el.category}
                    </a>
                    <button onClick={() => setSubmenu(el.category)} className={styles.nextButton}>
                      <SmallArrow />
                    </button>
                  </>
                ) : (
                  <button onClick={() => setSubmenu(null)} className={styles.nextButton}>
                    <SmallArrow className={clsx(submenu === el.category && styles.arrowActive)} />
                    {el.category}
                  </button>
                )}
              </div>
              {submenu === el.category && (
                <ul className={clsx(styles.menu, styles.submenu)}>
                  {el.types.map((type) => (
                    <li key={type.id} className={styles.menuItem}>
                      <div className={styles.menuGroup}>
                        <a href="#" className={styles.menuLink}>
                          {type.type}
                        </a>
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
      {mocks.map((el) => (
        <li
          onMouseEnter={() => setSubmenu(el.category)}
          key={el.category}
          className={styles.menuItem}
        >
          <div className={styles.menuGroup}>
            <a href="#" className={clsx(styles.menuLink, submenu === el.category && styles.active)}>
              {el.category}
            </a>
          </div>
          {submenu === el.category && (
            <div className={styles.menuWrapper}>
              <div className={styles.top}>
                <ul className={clsx(styles.menu, styles.submenu)}>
                  {el.types.map((type) => (
                    <li key={type.id} className={styles.menuItem}>
                      <div className={styles.menuGroup}>
                        <a href="#" className={styles.menuLink}>
                          {type.type}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className={styles.productsList}>
                  <ProductCard elementVariant="li" />
                  <ProductCard />
                  <ProductCard />
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
