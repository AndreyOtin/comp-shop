import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { makeFirstLetterUpperCase } from 'utils/common';
import clsx from 'clsx';

type BreadCrumbsProps = {
  className?: string;
};

function Breadcrumbs({ className }: BreadCrumbsProps) {
  const location = useLocation();
  const { type } = useParams();
  const paths = location.pathname.split('/').filter(Boolean);
  let currentPath = '';

  return (
    <ul className={clsx(styles.list, className)}>
      {paths.map((path, i, arr) => {
        currentPath += '/' + path;

        return (
          <li key={currentPath} className={styles.item}>
            {arr.length - 1 === i ? (
              <span className={styles.link}>{makeFirstLetterUpperCase(path)}</span>
            ) : (
              <Link to={currentPath} className={styles.link}>
                {makeFirstLetterUpperCase(path)}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumbs;
