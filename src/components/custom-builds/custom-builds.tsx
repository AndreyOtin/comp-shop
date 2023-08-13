import Products from 'components/products/products';
import { AppRoute, CatalogUrlParam } from 'consts/enum';
import { useAppSelector } from 'hooks/hooks';
import { generatePath } from 'react-router-dom';
import { selectProducts } from 'store/products-slice/products-slice';

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
          to={generatePath(AppRoute.Catalog, {
            category: CatalogUrlParam.CustomBuilds,
            type: ''
          })}
        />
      )}
      products={products.filter((p) => p.isCustom)}
      types={[]}
    />
  );
}

export default CustomBuilds;
