import VisuallyHidden from 'common-ui/visually-hidden/visually-hidden';
import styles from './filter-group.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ReactComponent as ArrowIcon } from 'assets/icons/small-arrow.svg';

type FilterGroupProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

function FilterGroup({ children, title, className }: FilterGroupProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className={clsx(styles.groupButton, open && styles.active)}
      >
        {title}
        <ArrowIcon />
      </button>
      <fieldset disabled={!open} className={clsx(className)}>
        <VisuallyHidden>
          <legend>{title}</legend>
        </VisuallyHidden>
        <div
          style={{
            paddingBottom: open ? ref.current?.getBoundingClientRect().height + 'px' : 0
          }}
          className={clsx(styles.dropwown, open && styles.visable)}
        >
          <div ref={ref} className={styles.wrapper}>
            {children}
          </div>
        </div>
      </fieldset>
    </>
  );
}

export default FilterGroup;
