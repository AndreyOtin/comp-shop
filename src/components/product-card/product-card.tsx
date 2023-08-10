import { ReactComponent as Star } from 'assets/icons/star.svg';
import Button from 'common-ui/button/button';
import { ReactComponent as Cart } from 'assets/icons/cart.svg';
import { ReactComponent as Graph } from 'assets/icons/graph.svg';
import { ReactComponent as Heart } from 'assets/icons/heart.svg';
import Placeholder from 'common-ui/placeholder/placeholder';
import styles from './product-card.module.scss';
import clsx from 'clsx';
import { LayoutVariant } from 'consts/variants';
import { Product } from 'types/product';
import { getDottedDescription } from 'utils/common';
import { Link, generatePath, useParams } from 'react-router-dom';
import { AppRoute } from 'consts/enum';

type ProductCard = {
  elementVariant?: 'div' | 'li';
  layout?: LayoutVariant;
  product: Product;
};

function ProductCard({ elementVariant = 'div', layout = LayoutVariant.Row, product }: ProductCard) {
  const Element = elementVariant === 'div' ? 'div' : 'li';
  const { inStock, name, image, newPrice, price, id } = product;
  const { category } = useParams();

  return (
    <Element className={clsx(styles.card, styles[layout])}>
      <Placeholder inStock={inStock} className={styles.placeholder} />

      <div className={styles.icons}>
        <button>
          <Heart />
        </button>
        <button>
          <Graph />
        </button>
      </div>

      <div className={styles.content}>
        <Link
          to={generatePath(AppRoute.Product, { category: category || '', product: id.toString() })}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.image}>
              <img src={image} alt="" width={150} height={150} />
            </div>
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
        </Link>
        <div className={styles.body}>
          <p className={styles.desc}>{getDottedDescription(name, 60)}</p>
          <div className={styles.price}>
            <span className={clsx(newPrice && styles.oldPrice)}>$ {price}</span>
            {newPrice && <span className={styles.newPrice}>$ {newPrice}</span>}
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
