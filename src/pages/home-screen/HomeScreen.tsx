import Placeholder from 'common-ui/placeholder/placeholder';
import styles from './home.module.scss';
import ProductCard from 'components/product-card/product-card';
import { default as Btn } from 'common-ui/button/button';
import Button from '@mui/material/Button';

import React, { useState } from 'react';

type HomeScreenProps = {};

function HomeScreen(props: HomeScreenProps): JSX.Element {
  return (
    <main className={styles.home}>
      {/* <Btn onClick={(): void => setState(true)}>Hello</Btn> */}
      <ProductCard />
    </main>
  );
}

export default HomeScreen;
