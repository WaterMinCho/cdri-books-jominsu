import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '../api/books';

const MAX_SUGGESTIONS = 8;

const useSearchSuggestions = (keyword: string) => {
  const { data } = useQuery({
    queryKey: ['book-suggestions', keyword],
    queryFn: () => searchBooks({ query: keyword }, 1),
    enabled: keyword.trim().length > 0,
    staleTime: 1000 * 60,
    select: (response) => [...new Set(response.documents.map((book) => book.title))].slice(0, MAX_SUGGESTIONS),
  });

  return data ?? [];
};

export default useSearchSuggestions;
