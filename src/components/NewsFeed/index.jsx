import { useState } from 'react';
import styles from './NewsFeed.module.scss';
import TagToggleGroup from '../TagToggle';
import ArticleCard from '../ArticleCard';
import { useNews } from '../../hooks/useNews';
import { formatPageDate } from '../../utils/formatDate';

const CATEGORY_MAP = {
  All: null,
  World: 'world',
  Tech: 'technology',
  Sports: 'sports',
  Business: 'business',
  Sci: 'science',
  Entertainment: 'entertainment',
};

export default function NewsFeed() {
  const { articles, loading, error } = useNews();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) =>
          a.category?.includes(CATEGORY_MAP[activeCategory])
        );

  return (
    <div className={styles.screen}>
      <div className={styles.scrollArea}>
        <div className={styles.scrollContent}>
          <div className={styles.header}>
            <p className={styles.pageTitle}>Your Latest News</p>
            <p className={styles.pageDate}>{formatPageDate()}</p>
          </div>

          <div className={styles.filterRow}>
            <TagToggleGroup onSelect={setActiveCategory} />
          </div>

          <div className={styles.dividerFull} aria-hidden="true" />

          <div className={styles.articles}>
            {loading && <p className={styles.state}>Loading…</p>}
            {error && (
              <p className={`${styles.state} ${styles.error}`}>
                Could not load news. Check your connection.
              </p>
            )}
            {!loading &&
              !error &&
              filtered.slice(0, 10).map((article, i, arr) => (
                <ArticleCard
                  key={article.article_id ?? i}
                  article={article}
                  showDivider={i < arr.length - 1}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
