import Placeholder from 'common-ui/placeholder/placeholder';
import styles from './home.module.scss';
import ProductCard from 'components/product-card/product-card';
import { default as Btn } from 'common-ui/button/button';
import Button from '@mui/material/Button';

import React, { useState } from 'react';
import Promo from 'components/promo/promo';
import NewProducts from 'components/new-products/new-products';

type HomeScreenProps = {};

function HomeScreen(props: HomeScreenProps): JSX.Element {
  return (
    <main className={styles.home}>
      <Promo />
      <NewProducts />
    </main>
  );
}

export default HomeScreen;
