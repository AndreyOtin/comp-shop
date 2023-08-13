import Products from 'components/products/products';
import { AppRoute } from 'consts/enum';
import { useAppSelector } from 'hooks/hooks';
import { generatePath } from 'react-router-dom';
import { selectLaptops, selectTypes } from 'store/products-slice/products-slice';

function Laptops() {
  const { products } = useAppSelector(selectLaptops);
  const types = useAppSelector(selectTypes);

  return (
    <Products
      renderSectionHeader={(SectionHeader) => (
        <SectionHeader
          variant="withImage"
          imageSrc="img/msi.jpg"
          linkText="See all products"
          title="Laptops"
          to={generatePath(AppRoute.Catalog, {
            category: products[0]?.category.name.split(' ').join('-'),
            type: ''
          })}
        />
      )}
      types={types}
      products={products}
    />
  );
}

export default Laptops;
