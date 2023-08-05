import ProductCard from 'components/product-card/product-card';
import Products from 'components/products/products';
import { AppRoute, MaxElementCount } from 'consts/enum';
import { useAppSelector } from 'hooks/hooks';
import { useState } from 'react';
import { generatePath } from 'react-router-dom';
import { selectLaptops, selectTypes } from 'store/products-slice/products-slice';
import { createRandomElementsArray } from 'utils/common';

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
          to={generatePath(AppRoute.Catalog, { category: 'laptops', type: '' })}
        />
      )}
      types={types}
      products={products}
    />
  );
}

export default Laptops;
