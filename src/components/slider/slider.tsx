import { ReactNode } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import styles from './slider.module.scss';
import { ReactComponent as ButtonIcon } from 'assets/icons/slider-button.svg';
import clsx from 'clsx';

type SliderProps = {
  children: ReactNode;
} & SwiperProps;

function Slider({ children, className, ...rest }: SliderProps) {
  return (
    <Swiper
      className={clsx(styles.swiper, className)}
      modules={[Navigation]}
      navigation={{
        nextEl: `.${styles.rigthbutton}`,
        prevEl: `.${styles.leftbutton}`
      }}
      slidesPerView={1}
      loop
      observeParents
      observeSlideChildren
      observer
      {...rest}
    >
      {children}
      <button className={styles.leftbutton}>
        <ButtonIcon />
      </button>
      <button className={styles.rigthbutton}>
        <ButtonIcon />
      </button>
    </Swiper>
  );
}

export default Slider;
