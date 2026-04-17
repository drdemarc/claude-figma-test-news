import styles from './ArticleMeta.module.scss';
import { formatTimestamp } from '../../utils/formatDate';

export default function ArticleMeta({ publisher, pubDate }) {
  return (
    <div className={styles.meta}>
      <span className={styles.publisher}>{publisher || 'Unknown'}</span>
      <span className={styles.separator}>·</span>
      <span className={styles.timestamp}>{formatTimestamp(pubDate)}</span>
    </div>
  );
}
