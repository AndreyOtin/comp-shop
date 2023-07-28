import Promo from 'components/promo/promo';
import NewProducts from 'components/new-products/new-products';
import CustomBuilds from 'components/custom-builds/custom-builds';
import Laptops from 'components/laptops/laptops';
import Desktops from 'components/desktops/desktops';
import Brands from 'components/brands/brands';
import styles from './home.module.scss';
import Reviews from 'components/reviews/reviews';
import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';

type HomeScreenProps = {};

function HomeScreen(props: HomeScreenProps): JSX.Element {
  return (
    <main className={styles.home}>
      <VisuallyHidden>
        <h2 className={styles.test}>Main page</h2>
      </VisuallyHidden>
      <Promo img="img/promo.jpg" />
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
