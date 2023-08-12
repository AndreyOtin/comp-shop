import ProductCard from 'components/product-card/product-card';
import Slider from 'components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import styles from './new-products.module.scss';
import SectionHeader from 'components/section-header/section-header';
import { selectProducts } from 'store/products-slice/products-slice';
import { useAppSelector } from 'hooks/hooks';
import { generatePath } from 'react-router-dom';
import { AppRoute, CatalogUrlParam } from 'consts/enum';
import useResponsive from 'hooks/use-responsive';

function NewProducts() {
  const { products } = useAppSelector(selectProducts);
  const { isSmallMobile } = useResponsive();

  const filteredProducts = products.filter((p) => p.isNew);

  return (
    <section className={styles.newProducts}>
      <div className={styles.container}>
        <SectionHeader
          linkText="See all new Products"
          title="New Products"
          to={generatePath(AppRoute.Catalog, { category: CatalogUrlParam.NewProducts, type: '' })}
        />
        <Slider
          slidesPerView={1}
          loop={false}
          className={styles.slider}
          slidesOffsetBefore={(isSmallMobile && 70) || undefined}
          breakpoints={{
            530: {
              slidesPerView: 2
            },
            735: {
              slidesPerView: 3
            },
            975: {
              slidesPerView: 4
            },
            1450: {
              slidesPerView: 6
            }
          }}
        >
          {filteredProducts.map((p) => (
            <SwiperSlide key={p.id} className={styles.activeSlide}>
              <ProductCard elementVariant="div" product={p} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default NewProducts;
