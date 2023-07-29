import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import { FilterForm } from 'common-ui';
import styles from './all-filters.module.scss';

function AllFilters() {
  return (
    <FilterForm title="Filters">
      <FilterForm.Button text="Reset All" />
      <FilterForm.FilterGroup title="Category" className={styles.filterGroup}>
        <div className={styles.group}>
          <VisuallyHidden>
            <input type="checkbox" id="1" />
          </VisuallyHidden>
          <label htmlFor="1">Desktops</label>
          <span className={styles.count}>33</span>
        </div>
        <div className={styles.group}>
          <VisuallyHidden>
            <input type="checkbox" id="2" />
          </VisuallyHidden>
          <label htmlFor="2">Laptops</label>
          <span className={styles.count}>44</span>
        </div>
      </FilterForm.FilterGroup>

      <FilterForm.FilterGroup title="Price" className={styles.filterGroup}>
        <div className={styles.group}>
          <VisuallyHidden>
            <input type="checkbox" id="3" />
          </VisuallyHidden>
          <label htmlFor="3">1000-1200</label>
          <span className={styles.count}>55</span>
        </div>
        <div className={styles.group}>
          <VisuallyHidden>
            <input type="checkbox" id="4" />
          </VisuallyHidden>
          <label htmlFor="4">2000-3200</label>
          <span className={styles.count}>666</span>
        </div>
      </FilterForm.FilterGroup>

      <FilterForm.FilterGroup title="Type" className={styles.filterGroup}>
        <div className={styles.group}>
          <VisuallyHidden>
            <input type="checkbox" id="32" />
          </VisuallyHidden>
          <label htmlFor="32">Every</label>
          <span className={styles.count}>55</span>
        </div>
        <div className={styles.group}>
          <VisuallyHidden>
            <input type="checkbox" id="42" />
          </VisuallyHidden>
          <label htmlFor="42">Sone</label>
          <span className={styles.count}>666</span>
        </div>
      </FilterForm.FilterGroup>

      <FilterForm.FilterGroup title="Color" className={styles.filterGroup}>
        <div className={styles.colorGroup}>
          <VisuallyHidden>
            <input type="checkbox" id="6" />
          </VisuallyHidden>
          <label htmlFor="6">
            <VisuallyHidden>
              <span>red</span>
            </VisuallyHidden>
            <span
              style={{
                backgroundColor: 'red'
              }}
            ></span>
          </label>
          <VisuallyHidden>
            <input type="checkbox" id="7" />
          </VisuallyHidden>
          <label htmlFor="7">
            <VisuallyHidden>
              <span>blue</span>
            </VisuallyHidden>
            <span
              style={{
                backgroundColor: 'pink'
              }}
            ></span>
          </label>
        </div>
      </FilterForm.FilterGroup>
      <FilterForm.ApplyButton count={2} />
    </FilterForm>
  );
}

export default AllFilters;
