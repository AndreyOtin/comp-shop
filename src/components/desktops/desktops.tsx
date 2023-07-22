import ProductCard from 'components/product-card/product-card';
import Products from 'components/products/products';

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
  return (
    <Products
      renderSectionHeader={(SectionHeader) => (
        <SectionHeader
          variant="withImage"
          imageSrc="img/desktop.png"
          linkText="See all products"
          title="Desctops"
        />
      )}
      types={mocks}
    >
      <ProductCard elementVariant="li" />
      <ProductCard elementVariant="li" />
      <ProductCard elementVariant="li" />
    </Products>
  );
}

export default Desktops;
