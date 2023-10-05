import ProductCard from 'components/product-card/product-card';
import styles from './catalog.module.scss';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { CatalogUrlParam, DefaultValue, SearchParams, SortType, Status } from 'consts/enum';
import clsx from 'clsx';
import { getObjectValues, isEnumValue } from 'utils/types';
import { LayoutVariant } from 'consts/variants';
import { ProductsQuery } from 'types/product';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect, useLayoutEffect } from 'react';
import {
  getProducts,
  getRanges,
  getTypes,
  selectCategories,
  selectCategoriesStatus,
  selectProducts,
  selectProductsStatus,
  selectTypes,
  selectTypesStatus
} from 'store/products-slice/products-slice';
import { checkStatus } from 'utils/common';
import { Box, CircularProgress } from '@mui/material';
import ErrorScreen from 'pages/error-screen/error-screen';

function Catalog() {
  const [params] = useSearchParams({
    [SearchParams.Page]: DefaultValue.Page.toString(),
    [SearchParams.ShowCount]: DefaultValue.ShowCount.toString(),
    [SearchParams.Sort]: [DefaultValue.Sort].toString()
  });

  const { products } = useAppSelector(selectProducts);
  const storeTypes = useAppSelector(selectTypes);
  const storeCategories = useAppSelector(selectCategories);

  const productsStatus = useAppSelector(selectProductsStatus);
  const categoriesStatus = useAppSelector(selectCategoriesStatus);
  const typesStatus = useAppSelector(selectTypesStatus);

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
    color: colors,
    price: ranges,
    category: categoryId ? [categoryId.id.toString()] : categories,
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

    if (typesStatus !== Status.Loading) {
      dispatch(
        getTypes({
          ...(type ? {} : getParams()),
          isProducts: true
        })
      );
    }
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

  useLayoutEffect(() => {
    if (categoriesStatus === Status.Success && typesStatus === Status.Success) {
      dispatch(
        getProducts({
          ...getParams()
        })
      );
    }
  }, [categoriesStatus, typesStatus]);

  if (isLoading) {
    return (
      <Box
        sx={{
          color: 'blue',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (isError) {
    return <ErrorScreen variant="error" />;
  }

  if (
    !getObjectValues(CatalogUrlParam).some((p) => p === category) &&
    ((category && !categoryId) || (type && !typeId))
  ) {
    return <Navigate to="/not-found" />;
  }

  if (type && !typeId) {
    return <Navigate to="/not-found" />;
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
