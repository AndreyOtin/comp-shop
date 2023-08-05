import ProductCard from 'components/product-card/product-card';
import styles from './catalog.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { CatalogUrlParam, DefaultValue, SearchParams, SortType } from 'consts/enum';
import clsx from 'clsx';
import { checkSwitch, isEnumValue } from 'utils/types';
import { LayoutVariant } from 'consts/variants';
import { Product, ProductsQuery } from 'types/product';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect } from 'react';
import {
  getDesktops,
  getLaptops,
  getProducts,
  selectDesktops,
  selectDesktopsStatus,
  selectLaptops,
  selectLaptopsStatus,
  selectProductStatus,
  selectProducts
} from 'store/products-slice/products-slice';
import { checkStatus } from 'utils/common';
import { Backdrop, CircularProgress } from '@mui/material';
import ErrorScreen from 'pages/error-screen/ErrorScreen';

const sortByStock = (a: Product, b: Product) => Number(b.inStock) - Number(a.inStock);

function Catalog() {
  const [params] = useSearchParams({
    [SearchParams.Page]: DefaultValue.Page.toString(),
    [SearchParams.ShowCount]: DefaultValue.ShowCount.toString(),
    [SearchParams.Sort]: [DefaultValue.Sort].toString()
  });

  const { products } = useAppSelector(selectProducts);
  const { products: laptops } = useAppSelector(selectLaptops);
  const { products: desktops } = useAppSelector(selectDesktops);
  const laptopsStatus = useAppSelector(selectLaptopsStatus);
  const desktopsStatus = useAppSelector(selectDesktopsStatus);
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

  const type = useParams()?.type as CatalogUrlParam;

  const { isLoading, isError } = checkStatus({
    status: {
      ...(type === CatalogUrlParam.Desktops ? { desktopsStatus } : {}),
      ...(type === CatalogUrlParam.Laptpos ? { laptopsStatus } : {}),
      ...(type === undefined ||
      type === CatalogUrlParam.CustomBuilds ||
      type === CatalogUrlParam.NewProducts
        ? { productsStatus }
        : {})
    }
  });

  console.log(type);


  const getParams = (): NonNullable<ProductsQuery> => ({
    limit: showCount,
    offset: (page - 1) * showCount,
    brand: brands,
    category: categories,
    color: colors,
    price: ranges,
    type: types,
    ...(sort === SortType.Price ? { priceSort: 'asc' } : {}),
    ...(sort === SortType.Stock ? { inStock: true } : {})
  });

  useEffect(() => {
    switch (type) {
      case CatalogUrlParam.Laptpos:
        dispatch(
          getLaptops({
            ...getParams()
          })
        );
        break;

      case CatalogUrlParam.Desktops:
        dispatch(getDesktops({ ...getParams() }));
        break;

      default:
        dispatch(
          getProducts({
            ...getParams(),
            ...(type === CatalogUrlParam.CustomBuilds ? { isCustom: true } : {}),
            ...(type === CatalogUrlParam.NewProducts ? { isNew: true } : {})
          })
        );
        break;
    }
  }, [
    type,
    page,
    showCount,
    sort,
    brands.toString(),
    ranges.toString(),
    colors.toString(),
    categories.toString(),
    types.toString()
  ]);

  let filteredProducts: Product[] = [];
  switch (type) {
    case CatalogUrlParam.Desktops:
      filteredProducts = desktops;
      break;

    case CatalogUrlParam.Laptpos:
      filteredProducts = laptops;
      break;

    default:
      filteredProducts = products;
      break;
  }

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
      {!filteredProducts.length && (
        <p style={{ fontWeight: '1.5rem', fontSize: '1.5rem', margin: 'auto' }}>
          По вашему запросу ничего не найдено
        </p>
      )}
      {filteredProducts.map((p) => (
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
