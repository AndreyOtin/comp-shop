import React from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import styles from './promo.module.scss';
import { ReactComponent as ButtonIcon } from 'assets/icons/slider-button.svg';
import Slider from 'components/slider/slider';
import Image from 'common-ui/image/image';

type PromoProps = {
  img: string;
  variant?: 'slider' | 'default';
};

function Promo({ img, variant = 'slider' }: PromoProps) {
  return (
    <section className={styles.promo}>
      <div className={styles.container}>
        {variant === 'slider' ? (
          <Slider>
            <SwiperSlide className={styles.slide}>
              <a href="#">
                <img src={img} alt="promo image" />
              </a>
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <a href="#">
                <img src={img} alt="promo image" />
              </a>
            </SwiperSlide>
          </Slider>
        ) : (
          <Image href="#" img={img} alt="promo image" className={styles.ibg} />
        )}
      </div>
    </section>
  );
}

export default Promo;
