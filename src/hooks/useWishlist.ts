import { useCallback, useState } from 'react';
import type { Book } from '../types/book';

const STORAGE_KEY = 'certicos-books/wishlist';

function load(): Book[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

// isbn이 비어있는 도서가 간혹 있어 제목+저자를 보조 키로 사용
function bookKey(book: Book) {
  return book.isbn || `${book.title}/${book.authors.join(',')}`;
}

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Book[]>(load);

  const save = (next: Book[]) => {
    setWishlist(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const isLiked = useCallback((book: Book) => wishlist.some((item) => bookKey(item) === bookKey(book)), [wishlist]);

  const toggleLike = useCallback(
    (book: Book) => {
      const exists = wishlist.some((item) => bookKey(item) === bookKey(book));
      save(exists ? wishlist.filter((item) => bookKey(item) !== bookKey(book)) : [book, ...wishlist]);
    },
    [wishlist],
  );

  return { wishlist, isLiked, toggleLike };
};

export default useWishlist;
