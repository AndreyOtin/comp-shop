import { useState } from 'react';
import styles from './menu.module.scss';
import { ReactComponent as SmallArrow } from 'assets/icons/small-arrow.svg';
import clsx from 'clsx';

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

function Menu() {
  const [submenu, setSubmenu] = useState<string | null>(null);

  return (
    <ul className={styles.menu}>
      {mocks.map(
        (el) =>
          (!submenu || submenu === el.category) && (
            <li key={el.category} className={styles.menuItem}>
              <div className={styles.menuGroup}>
                <a href="#" className={styles.menuLink}>
                  {el.category}
                </a>
                <button
                  onClick={() => setSubmenu(submenu ? null : el.category)}
                  className={styles.nextButton}
                >
                  <SmallArrow className={clsx(submenu === el.category && styles.arrowActive)} />
                </button>
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
}

export default Menu;
