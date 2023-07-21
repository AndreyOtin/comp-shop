import ProductCard from 'components/product-card/product-card';
import Slider from 'components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import styles from './new-products.module.scss';

function NewProducts() {
  return (
    <section className={styles.newProducts}>
      <div className={styles.container}>
        <h2 className={styles.title}>New Products</h2>
        <Slider slidesPerView={6} loop={false} className={styles.slider}>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Slider>
      </div>
    </section>
  );
}

export default NewProducts;
