import { useState } from 'react';
import type { Book } from '../types/book';

const STORAGE_KEY = 'certicos-books/wishlist';

function load(): Book[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function bookKey(book: Book) {
  return book.isbn;
}

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Book[]>(load);

  const save = (next: Book[]) => {
    setWishlist(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const isLiked = (book: Book) => wishlist.some((item) => bookKey(item) === bookKey(book));

  const toggleLike = (book: Book) => {
    if (isLiked(book)) {
      save(wishlist.filter((item) => bookKey(item) !== bookKey(book)));
    } else {
      save([book, ...wishlist]);
    }
  };

  return { wishlist, isLiked, toggleLike };
};

export default useWishlist;
