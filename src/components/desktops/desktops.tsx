import ProductCard from 'components/product-card/product-card';
import Products from 'components/products/products';
import { AppRoute, MaxElementCount } from 'consts/enum';
import { useAppSelector } from 'hooks/hooks';
import { generatePath } from 'react-router-dom';
import { selectDesktops } from 'store/products-slice/products-slice';
import { createRandomElementsArray } from 'utils/common';

const mocks = [
  {
    'id': 3,
    'type': 'Prestige Series'
  },
  {
    'id': 4,
    'type': 'Gaming'
  },
  {
    'id': 2,
    'type': 'Workstation'
  },
  {
    'id': 1,
    'type': 'Everyday Use'
  }
];

function Desktops() {
  const { products } = useAppSelector(selectDesktops);
  const randomElements = createRandomElementsArray(products, MaxElementCount.HomePageProducts);

  return (
    <Products
      renderSectionHeader={(SectionHeader) => (
        <SectionHeader
          variant="withImage"
          imageSrc="img/desktop.png"
          linkText="See all products"
          title="Desktops"
          to={generatePath(AppRoute.Catalog, { type: 'desktops' })}
        />
      )}
      types={mocks}
    >
      {randomElements.map((p) => (
        <ProductCard key={p.id} product={p} elementVariant="li" />
      ))}
    </Products>
  );
}

export default Desktops;
