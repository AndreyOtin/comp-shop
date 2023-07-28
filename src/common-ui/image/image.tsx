import styles from './image.module.scss';
import clsx from 'clsx';

type ImageProps = {
  img: string;
  alt: string;
  className?: string;
  href?: string;
};

function Image({ className, img, alt, href }: ImageProps) {
  return (
    <div className={clsx(styles.ibg, className)}>
      {href ? (
        <a href={href}>
          <img src={img} alt={alt} />
        </a>
      ) : (
        <img src={img} alt={alt} />
      )}
    </div>
  );
}

export default Image;
