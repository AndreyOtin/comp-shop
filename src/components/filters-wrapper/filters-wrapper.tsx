import AllFilters from 'components/filters/all-filters/all-filters';
import BrandsFilter from 'components/filters/brands-filter/brands-filter';
import { useLocation } from 'react-router-dom';
import { useReducer, useEffect } from 'react';

function FiltersWrapper() {
  const location = useLocation();
  const [key, reset] = useReducer((key) => key + 1, 1);

  useEffect(() => {
    reset();
  }, [location.pathname]);

  return (
    <>
      <AllFilters key={key} />
      <BrandsFilter key={key + 1} />
    </>
  );
}

export default FiltersWrapper;
