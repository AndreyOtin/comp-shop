import styles from './custom-builds.module.scss';
import ProductCard from 'components/product-card/product-card';
import Products from 'components/products/products';

function CustomBuilds() {
  return (
    <Products
      renderSectionHeader={(SectionHeader) => (
        <SectionHeader
          variant="withImage"
          imageSrc="img/custom.png"
          linkText="See all products"
          title="Custom Builds"
        />
      )}
      types={[]}
    >
      <ProductCard elementVariant="li" />
      <ProductCard elementVariant="li" />
      <ProductCard elementVariant="li" />
      <ProductCard elementVariant="li" />
      {/* <ProductCard elementVariant="li" /> */}
      {/* <ProductCard elementVariant="li" />
      <ProductCard elementVariant="li" /> */}
    </Products>
  );
}

export default CustomBuilds;
