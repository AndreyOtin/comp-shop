import Button, { ButtonProps } from 'common-ui/button/button';
import { ComponentProps, forwardRef, FunctionComponent } from 'react';
import FilterGroup from './filter-group/filter-group';
import clsx from 'clsx';
import styles from './filter-form.module.scss';

type FilterFomrExtensions = {
  Button: FunctionComponent<ButtonProps<'button'> & { text: string }>;
  ApplyButton: FunctionComponent<ButtonProps<'button'> & { count: number }>;
  FilterGroup: typeof FilterGroup;
};

const FilterFormWithRef = forwardRef<HTMLFormElement, ComponentProps<'form'>>(
  ({ title, className, children, onSubmit }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit} action="#" className={clsx(styles.form, className)}>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </form>
    );
  }
);

const FilterForm = Object.assign(FilterFormWithRef, {} as FilterFomrExtensions);

FilterForm.Button = ({ text, variant = 'grey', ...rest }) => (
  <Button {...rest} className={styles.button} variant={variant}>
    {text}
  </Button>
);
FilterForm.ApplyButton = ({ count, ...rest }) => (
  <Button
    {...rest}
    as="button"
    type="button"
    variant="blue"
    isFilled
    className={styles.applyButton}
  >
    Apply filters <span className={styles.filtersCount}>({count})</span>
  </Button>
);
FilterForm.FilterGroup = FilterGroup;

export default FilterForm;
