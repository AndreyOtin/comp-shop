import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './reviews.module.scss';
import Button from 'common-ui/button/button';
import { getDottedDescription } from 'utils/common';

const comment = `My first order arrived today in perfect condition. From the time I sent a question
about the item to making the purchase, to the shipping and now the delivery, your
company, Tecs, has stayed in touch. Such great service. I look forward to shopping
on your site in the future and would highly recommend it.`;

function Reviews() {
  return (
    <section className={styles.reviews}>
      <Swiper
        className={styles.swiper}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: `.${styles.bullets}`,
          type: 'bullets'
        }}
        autoHeight
      >
        <SwiperSlide className={styles.slide}>
          <blockquote>
            <div className={styles.body}>
              <p className={styles.comment}>{getDottedDescription(comment)}</p>
              <cite className={styles.author}>Tomas Berg</cite>
            </div>
          </blockquote>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <blockquote>
            <div className={styles.body}>
              <p className={styles.comment}>{getDottedDescription(comment)}</p>
              <cite className={styles.author}>Tomas Berg</cite>
            </div>
          </blockquote>
        </SwiperSlide>
        <div className={styles.bulletsContainer}>
          <Button as="a" href="#" className={styles.reviewButton}>
            Leave us a review
          </Button>
          <div className={styles.bullets}></div>
        </div>
      </Swiper>
    </section>
  );
}

export default Reviews;
