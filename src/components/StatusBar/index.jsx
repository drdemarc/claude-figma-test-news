import styles from './StatusBar.module.scss';

export default function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className={styles.statusBar}>
      <span className={styles.time}>{time}</span>
      <span className={styles.icons}>▲▲ WiFi 100%</span>
    </div>
  );
}
