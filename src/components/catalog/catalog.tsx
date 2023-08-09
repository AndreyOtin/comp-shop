import ProductCard from 'components/product-card/product-card';
import styles from './catalog.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { CatalogUrlParam, DefaultValue, SearchParams, SortType } from 'consts/enum';
import clsx from 'clsx';
import { isEnumValue } from 'utils/types';
import { LayoutVariant } from 'consts/variants';
import { ProductsQuery } from 'types/product';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect } from 'react';
import {
  getProducts,
  getRanges,
  selectCategories,
  selectProductStatus,
  selectProducts,
  selectTypes
} from 'store/products-slice/products-slice';
import { checkStatus } from 'utils/common';
import { Backdrop, CircularProgress } from '@mui/material';
import ErrorScreen from 'pages/error-screen/ErrorScreen';

function Catalog() {
  const [params] = useSearchParams({
    [SearchParams.Page]: DefaultValue.Page.toString(),
    [SearchParams.ShowCount]: DefaultValue.ShowCount.toString(),
    [SearchParams.Sort]: [DefaultValue.Sort].toString()
  });

  const { products } = useAppSelector(selectProducts);
  const storeTypes = useAppSelector(selectTypes);
  const storeCategories = useAppSelector(selectCategories);

  const productsStatus = useAppSelector(selectProductStatus);
  const dispatch = useAppDispatch();

  const page = Number(params.get(SearchParams.Page));
  const showCount = Number(params.get(SearchParams.ShowCount));
  const sort = params.get(SearchParams.Sort);
  const layout = params.get(SearchParams.Layout) || '';
  const brands = params.getAll(SearchParams.Brand);
  const categories = params.getAll(SearchParams.Category);
  const ranges = params.getAll(SearchParams.Range);
  const colors = params.getAll(SearchParams.Color);
  const types = params.getAll(SearchParams.Type);

  const { type, category } = useParams();

  const { isLoading, isError } = checkStatus({
    status: { productsStatus }
  });

  const typeId = storeTypes.find(
    (t) => t.name.toLowerCase() === (type && type.split('-').join(' ').toLowerCase())
  );

  const categoryId = storeCategories.find(
    (c) => c.name.toLowerCase() === (category && category.split('-').join(' ').toLowerCase())
  );

  const getParams = (): NonNullable<ProductsQuery> => ({
    limit: showCount,
    offset: (page - 1) * showCount,
    brand: brands,
    category: categoryId ? [categoryId.id.toString()] : categories,
    color: colors,
    price: ranges,
    type: typeId ? [typeId.id.toString()] : types,
    ...(sort === SortType.Price ? { priceSort: 'asc' } : {}),
    ...(sort === SortType.Stock ? { inStock: true } : {}),
    ...(category === CatalogUrlParam.CustomBuilds ? { isCustom: true } : {}),
    ...(category === CatalogUrlParam.NewProducts ? { isNew: true } : {})
  });

  useEffect(() => {
    dispatch(
      getRanges({
        ...getParams()
      })
    );
    dispatch(
      getProducts({
        ...getParams()
      })
    );
  }, [
    type,
    category,
    page,
    showCount,
    sort,
    brands.toString(),
    ranges.toString(),
    colors.toString(),
    categories.toString(),
    types.toString()
  ]);

  if (isLoading) {
    return (
      <Backdrop sx={{ color: 'blue', zIndex: 2 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isError) {
    return <ErrorScreen variant="error" />;
  }

  return (
    <ul className={clsx(styles.catalog, styles[layout])}>
      {!products.length && (
        <p style={{ fontWeight: '1.5rem', fontSize: '1.5rem', margin: 'auto' }}>
          По вашему запросу ничего не найдено
        </p>
      )}
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          layout={isEnumValue(LayoutVariant, layout) ? layout : undefined}
          elementVariant="li"
        />
      ))}
    </ul>
  );
}

export default Catalog;
