import Placeholder from 'common-ui/placeholder/placeholder';
import styles from './home.module.scss';
import ProductCard from 'components/product-card/product-card';
import { default as Btn } from 'common-ui/button/button';
import Button from '@mui/material/Button';

type HomeScreenProps = {};

function HomeScreen(props: HomeScreenProps) {
  return (
    <main className={styles.home}>
      <ProductCard />
    </main>
  );
}

export default HomeScreen;
