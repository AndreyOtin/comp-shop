import { ReactComponent as Star } from 'assets/icons/star.svg';
import Button from 'common-ui/button/button';
import { ReactComponent as Cart } from 'assets/icons/cart.svg';
import { ReactComponent as Graph } from 'assets/icons/graph.svg';
import { ReactComponent as Heart } from 'assets/icons/heart.svg';
import Placeholder from 'common-ui/placeholder/placeholder';
import styles from './product-card.module.scss';
import clsx from 'clsx';
import { LayoutVariant } from 'consts/variants';

type ProductCard = {
  elementVariant?: 'div' | 'li';
  layout?: LayoutVariant;
};

function ProductCard({ elementVariant = 'div', layout = LayoutVariant.Row }: ProductCard) {
  const Element = elementVariant === 'div' ? 'div' : 'li';

  return (
    <Element className={clsx(styles.card, styles[layout])}>
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
          <div className={styles.rating}>
            <span>
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <Star key={`${index.toString()}`} />
                ))}
            </span>
            <span className={styles.reviewsCount}>Reviews (7)</span>
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur totam veritatis rerum
            quasi debitis expedita nihil facere veniam at doloremque sint quia minus explicabo
            maiores id sunt aliquam, vitae omnis.
          </p>
          <div className={styles.price}>
            <span className={styles.oldPrice}>$ 499</span>
            <span className={styles.newPrice}>$ 500</span>
          </div>
          <div className={styles.btnWrapper}>
            <Button className={styles.addToCartBtn}>
              <Cart />
              Add to cart
            </Button>
          </div>
        </div>

        {layout === LayoutVariant.Column && (
          <dl className={styles.specs}>
            <div className={styles.group}>
              <dt className={styles.spec}>CPU</dt>
              <dd className={styles.specDesc}>N/A</dd>
            </div>
            <div className={styles.group}>
              <dt className={styles.spec}>Featured</dt>
              <dd className={styles.specDesc}>N/A</dd>
            </div>
            <div className={styles.group}>
              <dt className={styles.spec}>I/O Ports</dt>
              <dd className={styles.specDesc}>N/A</dd>
            </div>
          </dl>
        )}
      </div>
    </Element>
  );
}

export default ProductCard;
