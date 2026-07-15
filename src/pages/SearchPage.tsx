import { useCallback, useState } from 'react';
import styled from 'styled-components';
import BookList from '../components/books/BookList';
import DetailSearchPopover from '../components/books/DetailSearchPopover';
import EmptyState from '../components/books/EmptyState';
import ResultCount from '../components/books/ResultCount';
import SearchBar from '../components/books/SearchBar';
import { Button } from '../components/common/Button';
import useBookSearch from '../hooks/useBookSearch';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useSearchHistory from '../hooks/useSearchHistory';
import useWishlist from '../hooks/useWishlist';
import type { BookSearchParams, SearchTarget } from '../types/book';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState<BookSearchParams>({ query: '' });
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { history, addHistory, removeHistory } = useSearchHistory();
  const { isLiked, toggleLike } = useWishlist();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useBookSearch(params);

  const books = data?.pages.flatMap((page) => page.documents) ?? [];
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  // 전체 검색과 상세 검색은 동시에 적용되지 않는다 (한쪽 실행 시 다른 쪽 조건 초기화)
  const searchAll = (query: string) => {
    addHistory(query);
    setParams({ query });
    setPopoverOpen(false);
  };

  const searchByTarget = (target: SearchTarget, query: string) => {
    setKeyword('');
    setParams({ query, target });
    setPopoverOpen(false);
  };

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const loadMoreRef = useIntersectionObserver(loadMore, books.length > 0);

  return (
    <section>
      <PageTitle>도서 검색</PageTitle>
      <SearchRow>
        <SearchBar
          value={keyword}
          onChange={setKeyword}
          onSearch={searchAll}
          history={history}
          onRemoveHistory={removeHistory}
        />
        <PopoverAnchor>
          <Button
            $variant="outline"
            $size="sm"
            onClick={() => setPopoverOpen((open) => !open)}
          >
            상세검색
          </Button>
          {popoverOpen && (
            <DetailSearchPopover
              onClose={() => setPopoverOpen(false)}
              onSearch={searchByTarget}
            />
          )}
        </PopoverAnchor>
      </SearchRow>
      <ResultCount
        label="도서 검색 결과"
        count={totalCount}
      />
      {isError ? (
        <StatusText>검색 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</StatusText>
      ) : isLoading ? (
        <StatusText>검색 중입니다…</StatusText>
      ) : books.length === 0 ? (
        <EmptyState message="검색된 결과가 없습니다." />
      ) : (
        <>
          <BookList
            books={books}
            isLiked={isLiked}
            onToggleLike={toggleLike}
          />
          {isFetchingNextPage && <StatusText>불러오는 중…</StatusText>}
          <div ref={loadMoreRef} />
        </>
      )}
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

const PopoverAnchor = styled.div`
  position: relative;
`;

const StatusText = styled.p`
  padding: 60px 0;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default SearchPage;
