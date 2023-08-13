import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import React, { useEffect, useRef, useState } from 'react';
import styles from './brands-filter.module.scss';
import { FilterForm } from 'common-ui';
import api from 'services/api';
import { APIRoute, DefaultValue, MaxElementCount, SearchParams } from 'consts/enum';
import { Brand } from 'types/product';
import { createRandomElementsArray, toggleValueInArray } from 'utils/common';
import { useSearchParams } from 'react-router-dom';

function BrandsFilter() {
  const [params, setParams] = useSearchParams();
  const [brands, setBrands] = useState<Brand[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (id: number) => {
    setParams((params) => {
      const brands = toggleValueInArray(params.getAll(SearchParams.Brand), id.toString());
      params.delete(SearchParams.Brand);
      params.set(SearchParams.Page, DefaultValue.Page.toString());
      brands.forEach((b) => params.append(SearchParams.Brand, b));

      return params;
    });

    window.scroll({ top: 0 });
  };

  const reset = () => {
    window.scroll({ top: 0 });

    setParams((params) => {
      params.delete(SearchParams.Brand);
      return params;
    });

    formRef.current?.reset();
  };

  useEffect(() => {
    api.get<Brand[]>(APIRoute.Brands).then(({ data }) => {
      setBrands(createRandomElementsArray(data, MaxElementCount.BrandsFilter));
    });
  }, []);

  return (
    <FilterForm ref={formRef} title="Brands">
      <FilterForm.Button type="reset" text="All brands" onClick={() => reset()} />
      <div className={styles.brandsList}>
        {brands.map(({ id, image, name }) => {
          return (
            <div key={name} className={styles.group}>
              <VisuallyHidden>
                <input
                  checked={params.getAll(SearchParams.Brand).includes(id.toString())}
                  type="checkbox"
                  id={name}
                  name={name}
                  onChange={() => handleChange(id)}
                />
              </VisuallyHidden>
              <label htmlFor={name}>
                <VisuallyHidden>
                  <span>{name}</span>
                </VisuallyHidden>
                <span className={styles.brand}>
                  <img src={image} alt={name} />
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </FilterForm>
  );
}

export default BrandsFilter;
