import Button, { ButtonProps } from 'common-ui/button/button';
import { FunctionComponent, ComponentProps } from 'react';
import FilterGroup from './filter-group/filter-group';
import clsx from 'clsx';
import styles from './filter-form.module.scss';

type FilterFomrExtensions = {
  Button: FunctionComponent<ButtonProps & { text: string }>;
  ApplyButton: FunctionComponent<ButtonProps & { count: number }>;
  FilterGroup: typeof FilterGroup;
};

const FilterForm: FilterFomrExtensions & FunctionComponent<ComponentProps<'form'>> = ({
  title,
  className,
  children,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} action="#" className={clsx(styles.form, className)}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </form>
  );
};

FilterForm.Button = ({ text, variant = 'grey', ...rest }) => (
  <Button {...rest} className={styles.button} variant={variant}>
    {text}
  </Button>
);
FilterForm.ApplyButton = ({ count, ...rest }) => (
  <Button {...rest} variant="blue" isFilled className={styles.applyButton}>
    Apply filters <span className={styles.filtersCount}>({count})</span>
  </Button>
);
FilterForm.FilterGroup = FilterGroup;

export default FilterForm;