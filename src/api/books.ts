import { kakaoClient } from './client';
import type { BookSearchParams, BookSearchResponse } from '../types/book';

export const PAGE_SIZE = 10;

export async function searchBooks({ query, target }: BookSearchParams, page: number) {
  const { data } = await kakaoClient.get<BookSearchResponse>('/v3/search/book', {
    params: { query, target, page, size: PAGE_SIZE },
  });
  return data;
}
