import ProductCard from 'components/product-card/product-card';
import styles from './catalog.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { CatalogTypeParam, DefaultValue, SearchParams, SortType } from 'consts/enum';
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
  const page = Number(params.get(SearchParams.Page));
  const showCount = Number(params.get(SearchParams.ShowCount));
  const sort = params.get(SearchParams.Sort);
  const layout = params.get(SearchParams.Layout) || '';
  const type = useParams()?.type as CatalogTypeParam;
  const { products } = useAppSelector(selectProducts);
  const { products: laptops } = useAppSelector(selectLaptops);
  const { products: desktops } = useAppSelector(selectDesktops);
  const laptopsStatus = useAppSelector(selectLaptopsStatus);
  const desktopsStatus = useAppSelector(selectDesktopsStatus);
  const productsStatus = useAppSelector(selectProductStatus);
  const dispatch = useAppDispatch();
  let filteredProducts: Product[] = [];

  const { isLoading, isError } = checkStatus({
    status: {
      ...(type === CatalogTypeParam.Desktops ? { desktopsStatus } : {}),
      ...(type === CatalogTypeParam.Laptpos ? { laptopsStatus } : {}),
      ...(type === undefined ||
      type === CatalogTypeParam.CustomBuilds ||
      type === CatalogTypeParam.NewProducts
        ? { productsStatus }
        : {})
    }
  });

  const getParams = (): NonNullable<ProductsQuery> => ({
    limit: showCount,
    offset: (page - 1) * showCount,
    ...(sort === SortType.Price ? { priceSort: 'asc' } : {}),
    ...(sort === SortType.Stock ? { inStock: true } : {})
  });

  useEffect(() => {
    switch (type) {
      case CatalogTypeParam.Laptpos:
        dispatch(
          getLaptops({
            ...getParams()
          })
        );
        break;

      case CatalogTypeParam.Desktops:
        dispatch(getDesktops({ ...getParams() }));
        break;

      default:
        dispatch(
          getProducts({
            ...getParams(),
            ...(type === CatalogTypeParam.CustomBuilds ? { isCustom: true } : {}),
            ...(type === CatalogTypeParam.NewProducts ? { isNew: true } : {})
          })
        );
        break;
    }
  }, [type, page, showCount, sort]);

  switch (type) {
    case CatalogTypeParam.Desktops:
      filteredProducts = desktops;
      break;

    case CatalogTypeParam.Laptpos:
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
