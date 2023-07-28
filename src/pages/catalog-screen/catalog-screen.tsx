import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import Promo from 'components/promo/promo';
import styles from './catalog-screen.module.scss';
import Filters from 'components/filters/filters/filters';
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg';
import { ReactComponent as FlexIcon } from 'assets/icons/flex.svg';
import { ReactComponent as ArrowIcon } from 'assets/icons/small-arrow.svg';
import BrandsFilter from 'components/filters/brands-filter/brands-filter';

function CatalogScreen() {
  return (
    <main className={styles.catalog}>
      <Promo variant="default" img="img/promo2.jpg" />
      <Breadcrumbs className={styles.breadcrumbs} />
      <h2 className={styles.title}>Catalog</h2>
      <div className={styles.body}>
        <div className={styles.aside}>
          <Filters />
          <BrandsFilter />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.allItems}>Items 1-35 of 61</div>
            <ul className={styles.sortControls}>
              <li className={styles.sortControl}>
                <button className={styles.sortButton}>
                  Sort By: <span>Position</span>
                  <ArrowIcon />
                </button>
              </li>
              <li className={styles.sortControl}>
                <button className={styles.showButton}>
                  Show: <span>35 per page</span>
                  <ArrowIcon />
                </button>
              </li>
            </ul>
            <ul className={styles.layoutControls}>
              <li className={styles.layoutControl}>
                <button className={styles.layoutButton}>
                  <GridIcon />
                </button>
              </li>
              <li className={styles.layoutControl}>
                <button className={styles.layoutButton}>
                  <FlexIcon />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CatalogScreen;
