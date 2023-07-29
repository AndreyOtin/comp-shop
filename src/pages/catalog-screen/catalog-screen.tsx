import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import Promo from 'components/promo/promo';
import styles from './catalog-screen.module.scss';

import { AllFilters, BrandsFilter } from 'components/filters';
import { MenuList, MenuItem, Menu } from '@mui/material';
import { useState } from 'react';
import Sort from 'components/sort/sort';
import { useSearchParams } from 'react-router-dom';
import LayoutControls from 'layout-controls/layout-controls';
import ProductsCounter from 'components/products-counter/products-counter';

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
        </div>
      </div>
    </main>
  );
}

export default CatalogScreen;
