import { AppRoute, SearchParams } from 'consts/enum';
import { Link, generatePath, useSearchParams } from 'react-router-dom';
import styles from './pagination.module.scss';
import { ReactComponent as Arrow } from 'assets/icons/small-arrow.svg';
import clsx from 'clsx';
import { default as Pag } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function Pagination() {
  const [params] = useSearchParams({ [SearchParams.Page]: '1' });
  const page = Number(params.get(SearchParams.Page));

  const getQueryWithoutPage = () => {
    params.delete(SearchParams.Page);
    const query = params.toString();
    params.set(SearchParams.Page, page.toString());

    return query && '&' + query;
  };

  return (
    <Pag
      page={page}
      defaultPage={1}
      count={50}
      siblingCount={2}
      renderItem={(item) => (
        <PaginationItem
          classes={{
            icon: clsx(styles.arrow, item.type === 'previous' && styles.arrowBack)
          }}
          slots={{ previous: Arrow, next: Arrow }}
          component={Link}
          {...item}
          className={clsx(styles.page, item?.selected && styles.active)}
          to={`${generatePath(AppRoute.Catalog)}?page=${
            item.page?.toString() || ''
          }${getQueryWithoutPage()}`}
        />
      )}
    />
  );
}

export default Pagination;
