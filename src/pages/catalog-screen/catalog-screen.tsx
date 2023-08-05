import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import Promo from 'components/promo/promo';
import styles from './catalog-screen.module.scss';
import { AllFilters, BrandsFilter } from 'components/filters';
import Sort from 'components/sort/sort';
import LayoutControls from 'components/layout-controls/layout-controls';
import ProductsCounter from 'components/products-counter/products-counter';
import Catalog from 'components/catalog/catalog';
import Pagination from 'components/pagination/pagination';

function CatalogScreen() {
  return (
    <main className={styles.catalog}>
      <Promo variant="default" img="img/promo2.jpg" />
      <Breadcrumbs className={styles.breadcrumbs} />
      <h2 className={styles.title}>Catalog</h2>
      <div className={styles.body}>
        <div className={styles.aside}>
          <AllFilters />
          <BrandsFilter />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <ProductsCounter />
            <Sort />
            <LayoutControls />
          </div>
          <div className={styles.catalog}>
            <Catalog />
          </div>
          <div className={styles.pagination}>
            <Pagination />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CatalogScreen;
