import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Using the{' '}
      <a href='https://github.com/harvardartmuseums/api-docs' target='_blank'>
        The Harvard Art Museums API
      </a>
    </footer>
  );
}
