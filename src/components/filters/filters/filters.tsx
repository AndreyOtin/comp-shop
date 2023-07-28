import Button from 'common-ui/button/button';
import styles from './filters.module.scss';
import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import FilterGroup from '../filter-group/filter-group';

function Filters() {
  return (
    <form action="" className={styles.form}>
      <h3 className={styles.title}>Filters</h3>
      <Button className={styles.restButton} variant="grey">
        Reset all
      </Button>
      <FilterGroup title="Category" className={styles.filterGroup}>
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
      </FilterGroup>

      <FilterGroup title="Price" className={styles.filterGroup}>
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
      </FilterGroup>
      <FilterGroup title="Type" className={styles.filterGroup}>
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
      </FilterGroup>
      <FilterGroup title="Color" className={styles.filterGroup}>
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
      </FilterGroup>
      <Button variant="blue" isFilled className={styles.applyButton}>
        Apply filters <span className={styles.filtersCount}>(2)</span>
      </Button>
    </form>
  );
}

export default Filters;
