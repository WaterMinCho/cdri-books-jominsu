import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks } from '../api/books';
import type { BookSearchParams } from '../types/book';

const useBookSearch = (params: BookSearchParams) => {
  return useInfiniteQuery({
    queryKey: ['books', params],
    queryFn: ({ pageParam }) => searchBooks(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (lastPage.meta.is_end ? undefined : pages.length + 1),
    enabled: params.query.trim().length > 0,
  });
};

export default useBookSearch;
