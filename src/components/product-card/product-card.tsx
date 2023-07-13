import { ReactComponent as Star } from 'assets/icons/star.svg';
import Button from 'common-ui/button/button';
import { ReactComponent as Cart } from 'assets/icons/cart.svg';
import { ReactComponent as Graph } from 'assets/icons/graph.svg';
import { ReactComponent as Heart } from 'assets/icons/heart.svg';
import Placeholder from 'common-ui/placeholder/placeholder';
import styles from './product-card.module.scss';
type ProductCard = {};

function ProductCard(props: ProductCard) {
  return (
    <li className={styles.card}>
      <Placeholder className={styles.placeholder} />
      <div className={styles.icons}>
        <button>
          <Heart />
        </button>
        <button>
          <Graph />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src="img/product/image 29.jpg" alt="" width={150} height={150} />
        </div>
        <div className={styles.body}>
          <div className={styles.rating}>
            <span>
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <Star />
                ))}
            </span>
            <span className={styles.reviewsCount}>Reviews (7)</span>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur totam veritatis rerum
            quasi debitis expedita nihil facere veniam at doloremque sint quia minus explicabo
            maiores id sunt aliquam, vitae omnis.
          </p>
          <div className={styles.price}>
            <span className={styles.oldPrice}>$ 499</span>
            <span className={styles.newPrice}>$ 500</span>
          </div>
        </div>
        <Button className={styles.addToCartBtn}>
          <Cart />
          Add to cart
        </Button>
      </div>
    </li>
  );
}

export default ProductCard;
