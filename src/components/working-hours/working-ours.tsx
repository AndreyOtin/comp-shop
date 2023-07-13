import { Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useState, useRef, useEffect } from 'react';
import Button from 'common-ui/button/button';
import styles from './working-ours.module.scss';
import clsx from 'clsx';
import { ReactComponent as Arrow } from 'assets/icons/arrow-down.svg';

type WorkingOursProps = {
  className: string;
};

function WorkingOurs({ className }: WorkingOursProps): JSX.Element {
  const [open, setOpened] = useState<HTMLButtonElement>();
  const id = open ? 'menu-popover' : undefined;

  return (
    <>
      <button
        className={clsx(styles.button, className)}
        aria-labelledby={id}
        onClick={(evt): void => setOpened(evt.currentTarget)}
      >
        Mon-Thu: <span>9:00 AM - 5:30 PM</span>
        <Arrow />
      </button>
      <Popover
        id={id}
        open={!!open}
        onClose={(): void => setOpened(undefined)}
        anchorEl={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className={styles.workingHours}>
          <Typography className={clsx(styles.container, styles.openHours)}>
            <span>We are open:</span>
            <span className={styles.group}>
              <span className={styles.days}> Mon-Thu:</span>
              <span className={styles.hours}>9:00 AM - 5:30 PM</span>
            </span>
            <span className={styles.group}>
              <span className={styles.days}>Fr:</span>
              <span className={styles.hours}>9:00 AM - 6:00 PM</span>
            </span>
            <span className={styles.group}>
              <span className={styles.days}>Sat:</span>
              <span className={styles.hours}> 11:00 AM - 5:00 PM</span>
            </span>
          </Typography>
          <Typography className={clsx(styles.container, styles.address)}>
            <span>Address: 1234 Street Adress, City Address, 1234</span>
          </Typography>
          <Typography className={clsx(styles.container, styles.contacts)}>
            <span className={clsx(styles.phone, styles.group)}>
              <span>Phones: </span>
              <span>
                <a href="tel:(00) 1234 5678">(00) 1234 5678</a>
              </span>
            </span>
            <span className={clsx(styles.email, styles.group)}>
              <span>E-mail: </span>
              <span>
                <a href="mailto:shop@email.com">shop@email.com</a>
              </span>
            </span>
          </Typography>
        </div>
      </Popover>
    </>
  );
}

export default WorkingOurs;
