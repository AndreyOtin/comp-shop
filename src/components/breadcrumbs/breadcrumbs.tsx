import { Link, useLocation } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { makeFirstLetterUpperCase } from 'utils/common';
import clsx from 'clsx';

// const pathToName = {
//   [CatalogUrlParam.NewProducts]: 'New products',
//   [CatalogUrlParam.CustomBuilds]: 'Custom builds'
// };

type BreadCrumbsProps = {
  className?: string;
  product?: string;
};

function Breadcrumbs({ className, product }: BreadCrumbsProps) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  let currentPath = '';

  if (product) {
    paths.splice(paths.length - 2, 2, product);
  }

  return (
    <ul className={clsx(styles.list, className)}>
      {paths.map((path, i, arr) => {
        currentPath += '/' + path;
        const name = makeFirstLetterUpperCase(path.split('-').join(' '));

        return (
          <li key={currentPath} className={styles.item}>
            {arr.length - 1 === i ? (
              <span style={{ opacity: 0.5, color: 'initial' }} className={styles.link}>
                {name}
              </span>
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
