import ProductCard from 'components/product-card/product-card';
import styles from './catalog.module.scss';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from 'consts/enum';
import clsx from 'clsx';
import { isEnumValue } from 'utils/types';
import { LayoutVariant } from 'consts/variants';

function Catalog() {
  const [params] = useSearchParams();
  const layout = params.get(SearchParams.Layout) || '';

  return (
    <ul className={clsx(styles.catalog, styles[layout])}>
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
      <ProductCard
        layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
        elementVariant="li"
      />
    </ul>
  );
}

export default Catalog;
