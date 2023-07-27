import ProductCard from 'components/product-card/product-card';
import Slider from 'components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import styles from './new-products.module.scss';
import SectionHeader from 'components/section-header/section-header';

function NewProducts() {
  return (
    <section className={styles.newProducts}>
      <div className={styles.container}>
        <SectionHeader linkText="See all new Products" title="New Products" />
        <Slider
          slidesPerView={1}
          loop={false}
          className={styles.slider}
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
          <SwiperSlide className={styles.activeSlide}>
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
