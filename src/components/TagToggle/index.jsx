import { useState } from 'react';
import styles from './TagToggle.module.scss';

const CATEGORIES = ['All', 'World', 'Tech', 'Sports', 'Business', 'Sci', 'Entertainment'];

export default function TagToggleGroup({ onSelect }) {
  const [active, setActive] = useState('All');

  function handleClick(label) {
    setActive(label);
    onSelect?.(label);
  }

  return (
    <div className={styles.group} role="tablist" aria-label="News categories">
      {CATEGORIES.map((label) => (
        <button
          key={label}
          role="tab"
          aria-selected={active === label}
          className={`${styles.tag}${active === label ? ` ${styles.active}` : ''}`}
          onClick={() => handleClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
