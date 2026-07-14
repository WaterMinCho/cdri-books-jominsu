import { useState } from 'react';
import styled from 'styled-components';
import BookList from '../components/books/BookList';
import EmptyState from '../components/books/EmptyState';
import ResultCount from '../components/books/ResultCount';
import SearchBar from '../components/books/SearchBar';
import useBookSearch from '../hooks/useBookSearch';
import type { BookSearchParams } from '../types/book';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState<BookSearchParams>({ query: '' });

  const { data } = useBookSearch(params);

  const books = data?.pages.flatMap((page) => page.documents) ?? [];
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  const searchAll = (query: string) => {
    setParams({ query });
  };

  return (
    <section>
      <PageTitle>도서 검색</PageTitle>
      <SearchRow>
        <SearchBar
          value={keyword}
          onChange={setKeyword}
          onSearch={searchAll}
        />
      </SearchRow>
      <ResultCount
        label="도서 검색 결과"
        count={totalCount}
      />
      {books.length === 0 ? <EmptyState message="검색된 결과가 없습니다." /> : <BookList books={books} />}
    </section>
  );
};

const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export default SearchPage;
