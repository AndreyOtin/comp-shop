import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getObjectKeys } from 'utils/types';
import { DefaultValue, SearchParams } from 'consts/enum';

export type CheckBoxFilter<K extends string = string> = Record<
  K,
  {
    enName: string;
    ruName: string;
    checked: boolean;
    disabledOnParams: string[];
  }
>;

function UseCheckboxFilter<T extends CheckBoxFilter>(initialState: Partial<T>, paramName: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState(() => {
    const state = structuredClone(initialState) as T;
    const filters = searchParams.getAll(paramName);
    const keys = getObjectKeys(state);

    keys.forEach((key) => {
      if (filters.includes(state[key].ruName)) {
        state[key].checked = true;
      }
    });

    return state;
  });

  const changeParams = (param: string, paramValue: string, isChecked: boolean) => {
    setSearchParams((prev) => {
      let values = prev.getAll(param);

      if (isChecked) {
        values.push(paramValue);
      } else {
        values = values.filter((el) => el !== paramValue);
      }

      prev.delete(param);
      prev.set(SearchParams.Page, DefaultValue.Page.toString());

      values.forEach((value) => {
        prev.append(param, value);
      });

      return prev;
    });
  };

  const handleFilterChange = (isChecked: boolean, key: keyof CheckBoxFilter, param: string) => {
    setFilter((prevState) => {
      const currentFilter = structuredClone(prevState) as typeof prevState;

      currentFilter[key].checked = isChecked;

      return currentFilter;
    });

    changeParams(param, filter[key].ruName, isChecked);
  };

  const resetState = () => {
    const iState = structuredClone(initialState) as T;
    setFilter(iState);
  };

  return { handleFilterChange, filter, resetState };
}

export default UseCheckboxFilter;
