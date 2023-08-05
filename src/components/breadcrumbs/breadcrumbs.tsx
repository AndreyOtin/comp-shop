import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { makeFirstLetterUpperCase } from 'utils/common';
import clsx from 'clsx';
import { CatalogUrlParam } from 'consts/enum';
import { hasOwn } from 'utils/types';

// const pathToName = {
//   [CatalogUrlParam.NewProducts]: 'New products',
//   [CatalogUrlParam.CustomBuilds]: 'Custom builds'
// };

type BreadCrumbsProps = {
  className?: string;
};

function Breadcrumbs({ className }: BreadCrumbsProps) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  let currentPath = '';

  return (
    <ul className={clsx(styles.list, className)}>
      {paths.map((path, i, arr) => {
        currentPath += '/' + path;
        const name = makeFirstLetterUpperCase(path.split('-').join(' '));

        return (
          <li key={currentPath} className={styles.item}>
            {arr.length - 1 === i ? (
              <span className={styles.link}>{name}</span>
            ) : (
              <Link to={currentPath} className={styles.link}>
                {name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumbs;
