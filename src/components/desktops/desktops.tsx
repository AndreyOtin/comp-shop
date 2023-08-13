import Products from 'components/products/products';
import { AppRoute } from 'consts/enum';
import { useAppSelector } from 'hooks/hooks';
import { generatePath } from 'react-router-dom';
import { selectDesktops, selectTypes } from 'store/products-slice/products-slice';

function Desktops() {
  const { products } = useAppSelector(selectDesktops);
  const types = useAppSelector(selectTypes);

  return (
    <Products
      renderSectionHeader={(SectionHeader) => (
        <SectionHeader
          variant="withImage"
          imageSrc="img/desktop.png"
          linkText="See all products"
          title="Desktops"
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

export default Desktops;
