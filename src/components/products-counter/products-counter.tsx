import { useSearchParams } from 'react-router-dom';
import styles from './products-counter.module.scss';
import { selectPaginationLength } from 'store/products-slice/products-slice';
import { useAppSelector } from 'hooks/hooks';
import { DefaultValue, SearchParams } from 'consts/enum';

function ProductsCounter() {
  const [params] = useSearchParams({
    [SearchParams.ShowCount]: DefaultValue.ShowCount.toString(),
    [SearchParams.Page]: DefaultValue.Page.toString()
  });
  const length = useAppSelector(selectPaginationLength);

  return (
    <div className={styles.allItems}>
      Items {params.get(SearchParams.Page)}-{params.get(SearchParams.ShowCount)} of {length}
    </div>
  );
}

export default ProductsCounter;
