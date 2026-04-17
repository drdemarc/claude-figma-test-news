import styles from './ArticleCard.module.scss';
import ArticleMeta from '../ArticleMeta';

export default function ArticleCard({ article, showDivider }) {
  const { title, description, image_url, source_name, pubDate, link } = article;

  return (
    <div className={styles.wrapper}>
      <ArticleMeta publisher={source_name} pubDate={pubDate} />
      <a
        className={styles.card}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
      >
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {image_url ? (
          <img
            className={styles.image}
            src={image_url}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
      </a>
      {showDivider && <div className={styles.divider} aria-hidden="true" />}
    </div>
  );
}
