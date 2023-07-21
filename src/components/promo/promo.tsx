import React from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import styles from './promo.module.scss';
import { ReactComponent as ButtonIcon } from 'assets/icons/slider-button.svg';
import Slider from 'components/slider/slider';

function Promo() {
  return (
    <section className={styles.promo}>
      <div className={styles.container}>
        <Slider>
          <SwiperSlide className={styles.slide}>
            <a href="#">
              <img src="img/slider.jpg" alt="promo image MSI" />
            </a>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <a href="#">
              <img src="img/slider.jpg" alt="promo image MSI" />
            </a>
          </SwiperSlide>
        </Slider>
      </div>
    </section>
  );
}

export default Promo;
