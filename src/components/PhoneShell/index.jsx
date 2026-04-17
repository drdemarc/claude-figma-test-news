import styles from './PhoneShell.module.scss';

export default function PhoneShell({ children }) {
  return (
    <div className={styles.shell} aria-label="Phone frame">
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
