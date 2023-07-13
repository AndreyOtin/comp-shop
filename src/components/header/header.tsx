import WorkingOurs from 'components/working-hours/working-ours';
import styles from './header.module.scss';

type HeaderProps = {};

function Header(props: HeaderProps): JSX.Element {
  return (
    <header>
      <div className={styles.top}>
        <WorkingOurs />
      </div>
    </header>
  );
}

export default Header;
