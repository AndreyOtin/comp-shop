import Promo from 'components/promo/promo';
import NewProducts from 'components/new-products/new-products';
import CustomBuilds from 'components/custom-builds/custom-builds';
import Laptops from 'components/laptops/laptops';
import Desktops from 'components/desktops/desktops';
import Brands from 'components/brands/brands';
import styles from './home.module.scss';
import Reviews from 'components/reviews/reviews';

type HomeScreenProps = {};

function HomeScreen(props: HomeScreenProps): JSX.Element {
  return (
    <main className={styles.home}>
      <Promo />
      <NewProducts />
      <CustomBuilds />
      <Laptops />
      <Desktops />
      <div className={styles.container}>
        <Brands className={styles.brands} />
      </div>
      <Reviews />
    </main>
  );
}

export default HomeScreen;
