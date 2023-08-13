import { AppRoute, DefaultValue, SearchParams } from 'consts/enum';
import { generatePath, Link, useParams, useSearchParams } from 'react-router-dom';
import styles from './pagination.module.scss';
import { ReactComponent as Arrow } from 'assets/icons/small-arrow.svg';
import clsx from 'clsx';
import { default as Pag } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useAppSelector } from 'hooks/hooks';
import { selectPaginationLength, selectProductsStatus } from 'store/products-slice/products-slice';
import { checkStatus } from 'utils/common';

function Pagination() {
  const [params] = useSearchParams({
    [SearchParams.Page]: DefaultValue.Page.toString(),
    [SearchParams.ShowCount]: DefaultValue.ShowCount.toString()
  });
  const page = Number(params.get(SearchParams.Page));
  const showCount = Number(params.get(SearchParams.ShowCount));
  const length = useAppSelector(selectPaginationLength);
  const { category, type } = useParams();
  const productsStaus = useAppSelector(selectProductsStatus);

  const { isLoading } = checkStatus({ status: { productsStaus } });

  const getQueryWithoutPage = () => {
    params.delete(SearchParams.Page);
    const query = params.toString();
    params.set(SearchParams.Page, page.toString());

    return query && '&' + query;
  };

  if (isLoading) {
    return null;
  }

  return (
    <Pag
      page={page}
      defaultPage={1}
      count={Math.ceil(length / showCount)}
      siblingCount={2}
      renderItem={({ onClick, ...item }) => (
        <PaginationItem
          onClick={(evt) => {
            window.scroll({ top: 0 });
            onClick(evt);
          }}
          classes={{
            icon: clsx(styles.arrow, item.type === 'previous' && styles.arrowBack)
          }}
          slots={{ previous: Arrow, next: Arrow }}
          component={Link}
          {...item}
          className={clsx(styles.page, item?.selected && styles.active)}
          to={`${generatePath(AppRoute.Catalog, {
            category: category || '',
            type: type || ''
          })}?page=${item.page?.toString() || ''}${getQueryWithoutPage()}`}
        />
      )}
    />
  );
}

export default Pagination;
