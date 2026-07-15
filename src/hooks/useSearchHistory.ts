import { useState } from 'react';

const STORAGE_KEY = 'certicos-books/search-history';
const MAX_HISTORY = 8;

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>(load);

  const save = (next: string[]) => {
    setHistory(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addHistory = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    save([trimmed, ...history].slice(0, MAX_HISTORY));
  };

  const removeHistory = (keyword: string) => {
    save(history.filter((item) => item !== keyword));
  };

  return { history, addHistory, removeHistory };
};

export default useSearchHistory;
