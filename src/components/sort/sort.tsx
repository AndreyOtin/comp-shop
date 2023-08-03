import { ReactComponent as ArrowIcon } from 'assets/icons/small-arrow.svg';
import { MenuItem, Menu } from '@mui/material';
import styles from './sort.module.scss';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DefaultValue, SearchParams } from 'consts/enum';
import { Default } from 'react-toastify/dist/utils';

const elementsPerPage = [10, 20, 35];
const sortTypes = ['price', 'stock'];

function Sort() {
  const [sortButton, setSortButton] = useState<HTMLButtonElement | null>(null);
  const [elementsCountButton, setElementsCountButton] = useState<HTMLButtonElement | null>(null);
  const [params, setParams] = useSearchParams();

  const showCount = params.get('show-count') || DefaultValue.ShowCount.toString();
  const sort = params.get('sort') || DefaultValue.Sort.toString();

  const handleSortClick = (el: string) => {
    setSortButton(null);
    setParams((prev) => {
      prev.set('sort', el);
      return prev;
    });
  };

  const handleElementsCountClick = (el: number) => {
    setElementsCountButton(null);
    setParams((prev) => {
      prev.set(SearchParams.ShowCount, el.toString());
      prev.set(SearchParams.Page, DefaultValue.Page.toString());
      return prev;
    });
  };

  return (
    <ul className={styles.sortControls}>
      <li className={styles.sortControl}>
        <button
          aria-labelledby="sort"
          onClick={(evt) => setSortButton(evt.currentTarget)}
          className={styles.sortButton}
        >
          Sort By: <span>{sort}</span>
          <ArrowIcon />
        </button>
        <Menu
          className={styles.dropdown}
          id="sort"
          open={!!sortButton}
          onClose={(): void => setSortButton(null)}
          anchorEl={sortButton}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          {sortTypes.map((el) => (
            <MenuItem
              key={el}
              onClick={() => handleSortClick(el)}
              disableRipple
              className={styles.menuItem}
            >
              {el}
            </MenuItem>
          ))}
        </Menu>
      </li>
      <li className={styles.sortControl}>
        <button
          aria-labelledby="elements-count"
          onClick={(evt) => setElementsCountButton(evt.currentTarget)}
          className={styles.showButton}
        >
          Show: <span>{showCount} per page</span>
          <ArrowIcon />
        </button>
        <Menu
          className={styles.dropdown}
          id="elements-count"
          open={!!elementsCountButton}
          onClose={() => setElementsCountButton(null)}
          anchorEl={elementsCountButton}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          {elementsPerPage.map((el) => (
            <MenuItem
              key={el}
              onClick={() => handleElementsCountClick(el)}
              disableRipple
              className={styles.menuItem}
            >
              {el}
            </MenuItem>
          ))}
        </Menu>
      </li>
    </ul>
  );
}

export default Sort;
