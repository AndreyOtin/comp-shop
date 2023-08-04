import styles from './custom-builds.module.scss';
import ProductCard from 'components/product-card/product-card';
import Products from 'components/products/products';
import { AppRoute, MaxElementCount } from 'consts/enum';
import { useAppSelector } from 'hooks/hooks';
import { generatePath } from 'react-router-dom';
import { selectProducts } from 'store/products-slice/products-slice';
import { createRandomElementsArray } from 'utils/common';

function CustomBuilds() {
  const { products } = useAppSelector(selectProducts);

  return (
    <Products
      renderSectionHeader={(SectionHeader) => (
        <SectionHeader
          variant="withImage"
          imageSrc="img/custom.png"
          linkText="See all products"
          title="Custom Builds"
          to={generatePath(AppRoute.Catalog, { type: 'custom' })}
        />
      )}
      products={products.filter((p) => p.isCustom)}
      types={[]}
    />
  );
}

export default CustomBuilds;
