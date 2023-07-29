import styles from './layout-controls.module.scss';
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg';
import { ReactComponent as FlexIcon } from 'assets/icons/flex.svg';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

function LayoutControls() {
  const [params, setParams] = useSearchParams({ layout: 'grid' });
  const layout = params.get('layout') as 'grid' | 'flex';

  return (
    <ul className={styles.layoutControls}>
      <li className={styles.layoutControl}>
        <button
          onClick={() =>
            setParams((prev) => {
              prev.set('layout', 'grid');
              return prev;
            })
          }
          className={clsx(styles.layoutButton, layout === 'grid' && styles.active)}
        >
          <GridIcon />
        </button>
      </li>
      <li className={styles.layoutControl}>
        <button
          onClick={() =>
            setParams((prev) => {
              prev.set('layout', 'flex');
              return prev;
            })
          }
          className={clsx(styles.layoutButton, layout === 'flex' && styles.active)}
        >
          <FlexIcon stroke="none" />
        </button>
      </li>
    </ul>
  );
}

export default LayoutControls;
