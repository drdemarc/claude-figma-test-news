import { useState, useEffect } from 'react';

const API_URL =
  'https://newsdata.io/api/1/latest?apikey=pub_e59201c6a78f44f3a83f675213e2e8a0&country=us&language=en&category=top&prioritydomain=top&image=1&removeduplicate=1';

export function useNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNews() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setArticles(data.results ?? []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNews();
    return () => { cancelled = true; };
  }, []);

  return { articles, loading, error };
}
