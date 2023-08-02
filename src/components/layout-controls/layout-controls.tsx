import styles from './layout-controls.module.scss';
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg';
import { ReactComponent as FlexIcon } from 'assets/icons/flex.svg';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { SearchParams } from 'consts/enum';
import { LayoutVariant } from 'consts/variants';

function LayoutControls() {
  const [params, setParams] = useSearchParams({ layout: LayoutVariant.Row });
  const layout = params.get(SearchParams.Layout);

  return (
    <ul className={styles.layoutControls}>
      <li className={styles.layoutControl}>
        <button
          onClick={() =>
            setParams((prev) => {
              prev.set(SearchParams.Layout, LayoutVariant.Row);
              return prev;
            })
          }
          className={clsx(styles.layoutButton, layout === LayoutVariant.Row && styles.active)}
        >
          <GridIcon />
        </button>
      </li>
      <li className={styles.layoutControl}>
        <button
          onClick={() =>
            setParams((prev) => {
              prev.set(SearchParams.Layout, LayoutVariant.Column);
              return prev;
            })
          }
          className={clsx(styles.layoutButton, layout === LayoutVariant.Column && styles.active)}
        >
          <FlexIcon stroke="none" />
        </button>
      </li>
    </ul>
  );
}

export default LayoutControls;
