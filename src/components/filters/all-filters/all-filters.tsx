import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import { FilterForm } from 'common-ui';
import styles from './all-filters.module.scss';
import { useState, Fragment, useEffect } from 'react';
import {
  getRanges,
  selectCategories,
  selectRanges,
  selectTypes
} from 'store/products-slice/products-slice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getObjectKeys } from 'utils/types';
import { DefaultValue, SearchParams } from 'consts/enum';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { toggleValueInArrray } from 'utils/common';

const colors = ['black', 'green', 'red', 'blue'];

function AllFilters() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const categories = useAppSelector(selectCategories);
  const types = useAppSelector(selectTypes);
  const ranges = useAppSelector(selectRanges);
  const dispatch = useAppDispatch();
  const { type, category } = useParams();

  const [state, setState] = useState<{
    [SearchParams.Category]: string[];
    [SearchParams.Color]: string[];
    [SearchParams.Range]: string[];
    [SearchParams.Type]: string[];
  }>(() => {
    const query = queryString.parse(params.toString()) as Record<string, string[]>;

    return {
      category:
        typeof query[SearchParams.Category] === 'string'
          ? [query[SearchParams.Category]]
          : query[SearchParams.Category] || [],
      color:
        typeof query[SearchParams.Color] === 'string'
          ? [query[SearchParams.Color]]
          : query[SearchParams.Color] || [],
      range:
        typeof query[SearchParams.Range] === 'string'
          ? [query[SearchParams.Range]]
          : query[SearchParams.Range] || [],
      type:
        typeof query[SearchParams.Type] === 'string'
          ? [query[SearchParams.Type]]
          : query[SearchParams.Type] || []
    };
  });

  useEffect(() => {
    dispatch(getRanges());
  }, []);

  useEffect(() => {
    reset();
  }, [location.pathname]);

  const filtersCount = getObjectKeys(state).reduce((acc, i) => acc + state[i].length, 0);

  const handleApplyClick = () => {
    window.scroll({ top: 0 });
    setParams((params) => {
      const prev = queryString.parse(params.toString());
      return queryString.stringify({ ...prev, ...state, [SearchParams.Page]: DefaultValue.Page });
    });
  };

  const reset = () => {
    setState({ category: [], color: [], range: [], type: [] });
    setParams((params) => {
      params.delete(SearchParams.Category);
      params.delete(SearchParams.Range);
      params.delete(SearchParams.Type);
      params.delete(SearchParams.Color);

      return params;
    });
    window.scroll({ top: 0 });
  };

  return (
    <FilterForm title="Filters">
      <FilterForm.Button type="reset" text="Reset All" onClick={() => reset()} />
      {!category && (
        <FilterForm.FilterGroup
          key={location.pathname + 1}
          title="Category"
          className={styles.filterGroup}
        >
          {categories.map((c) => (
            <div key={c.name} className={styles.group}>
              <VisuallyHidden>
                <input
                  checked={state.category.includes(c.id.toString())}
                  type="checkbox"
                  id={c.name}
                  onChange={() =>
                    setState({
                      ...state,
                      category: toggleValueInArrray(state.category, c.id.toString())
                    })
                  }
                />
              </VisuallyHidden>
              <label htmlFor={c.name}>{c.name}</label>
              <span className={styles.count}>{c.products.length}</span>
            </div>
          ))}
        </FilterForm.FilterGroup>
      )}

      <FilterForm.FilterGroup
        key={location.pathname + 2}
        title="Price"
        className={styles.filterGroup}
      >
        {getObjectKeys(ranges.rangedProducts).map((r) => (
          <div key={r} className={styles.group}>
            <VisuallyHidden>
              <input
                onChange={() => setState({ ...state, range: toggleValueInArrray(state.range, r) })}
                checked={state.range.includes(r)}
                type="checkbox"
                id={r}
              />
            </VisuallyHidden>
            <label htmlFor={r}>{r}</label>
            <span className={styles.count}>{ranges.rangedProducts[r].length}</span>
          </div>
        ))}
      </FilterForm.FilterGroup>

      {!type && (
        <FilterForm.FilterGroup
          key={location.pathname + 3}
          title="Type"
          className={styles.filterGroup}
        >
          {types.map((t) => (
            <div key={t.name} className={styles.group}>
              <VisuallyHidden>
                <input
                  onChange={() =>
                    setState({ ...state, type: toggleValueInArrray(state.type, t.id.toString()) })
                  }
                  checked={state.type.includes(t.id.toString())}
                  type="checkbox"
                  id={t.name}
                />
              </VisuallyHidden>
              <label htmlFor={t.name}>{t.name}</label>
              <span className={styles.count}>{t.products.length}</span>
            </div>
          ))}
        </FilterForm.FilterGroup>
      )}
      <FilterForm.FilterGroup
        key={location.pathname + 4}
        title="Color"
        className={styles.filterGroup}
      >
        <div className={styles.colorGroup}>
          {colors.map((color) => (
            <Fragment key={color}>
              <VisuallyHidden>
                <input
                  onChange={() =>
                    setState({ ...state, color: toggleValueInArrray(state.color, color) })
                  }
                  checked={state.color.includes(color)}
                  type="checkbox"
                  id={color}
                />
              </VisuallyHidden>
              <label htmlFor={color}>
                <VisuallyHidden>
                  <span>{color}</span>
                </VisuallyHidden>
                <span
                  style={{
                    backgroundColor: color
                  }}
                ></span>
              </label>
            </Fragment>
          ))}
        </div>
      </FilterForm.FilterGroup>
      <FilterForm.ApplyButton onClick={handleApplyClick} count={filtersCount} />
    </FilterForm>
  );
}

export default AllFilters;
