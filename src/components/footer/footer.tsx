import Socials from 'components/socials/socials';
import styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Socials variant="footer" />
        <p>Copyright © 2020 Shop Pty. Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
