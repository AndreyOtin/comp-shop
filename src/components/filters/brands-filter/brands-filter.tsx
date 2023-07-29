import Button from 'common-ui/button/button';
import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import React from 'react';
import styles from './brands-filter.module.scss';
import { FilterForm } from 'common-ui';
import { useState } from 'react';
import { getObjectKeys, hasOwn } from 'utils/types';

const ids = Array.from({ length: 6 }, () => crypto.randomUUID());

function BrandsFilter() {
  const [brand, setBrand] = useState({});

  const reslut = getObjectKeys(brand).filter((key) => brand[key]);

  return (
    <FilterForm title="Brands">
      <FilterForm.Button text="All brands" />
      <div className={styles.brandsList}>
        {Array.from({ length: 6 }, (_, i) => {
          const id = ids[i];

          return (
            <div key={id} className={styles.group}>
              <VisuallyHidden>
                <input
                  type="checkbox"
                  id={id}
                  name={id}
                  onChange={({ target: { name, checked } }) =>
                    setBrand({ ...brand, [name]: checked })
                  }
                />
              </VisuallyHidden>
              <label htmlFor={id}>
                <VisuallyHidden>
                  <span> Desktops</span>
                </VisuallyHidden>
                <span className={styles.brand}>
                  <img src="img/brands/adata.png" alt="" />
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
