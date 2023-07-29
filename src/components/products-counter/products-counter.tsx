import { useSearchParams } from 'react-router-dom';
import styles from './products-counter.module.scss';

function ProductsCounter() {
  const [params] = useSearchParams({ 'show-count': '30' });
  return <div className={styles.allItems}>Items 1-{params.get('show-count')} of 61</div>;
}

export default ProductsCounter;
