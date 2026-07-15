import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { PAGE_SIZE } from '../api/books';
import BookList from '../components/books/BookList';
import EmptyState from '../components/books/EmptyState';
import ResultCount from '../components/books/ResultCount';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useWishlist from '../hooks/useWishlist';

const WishlistPage = () => {
  const { wishlist, isLiked, toggleLike } = useWishlist();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const books = wishlist.slice(0, visibleCount);
  const hasMore = wishlist.length > visibleCount;

  const loadMore = useCallback(() => {
    setVisibleCount((count) => count + PAGE_SIZE);
  }, []);

  const loadMoreRef = useIntersectionObserver(loadMore, hasMore);

  return (
    <section>
      <PageTitle>내가 찜한 책</PageTitle>
      <ResultCount
        label="찜한 책"
        count={wishlist.length}
      />
      {wishlist.length === 0 ? (
        <EmptyState message="찜한 책이 없습니다." />
      ) : (
        <>
          <BookList
            books={books}
            isLiked={isLiked}
            onToggleLike={toggleLike}
          />
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

export default WishlistPage;
