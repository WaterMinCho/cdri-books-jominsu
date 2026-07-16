import { memo, useState } from 'react';
import styled from 'styled-components';
import type { Book } from '../../types/book';
import formatPrice from '../../utils/format';
import { Button } from '../common/Button';
import { addToast } from '../common/Toast';
import { ChevronDownIcon, HeartIcon } from '../common/icons';

type Props = {
  book: Book;
  liked: boolean;
  onToggleLike: (book: Book) => void;
};

// 무한 스크롤로 목록이 길어지므로 페이지 추가 로드 시 기존 아이템 리렌더를 막는다
const BookItem = memo(({ book, liked, onToggleLike }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const hasDiscount = book.sale_price > 0 && book.sale_price < book.price;
  const displayPrice = hasDiscount ? book.sale_price : book.price;

  const handlePurchaseClick = () => {
    if (!book.url) {
      addToast('구매 페이지 정보를 찾을 수 없어요.');
      return;
    }
    window.open(book.url, '_blank', 'noopener,noreferrer');
  };

  const likeButton = (size: number) => (
    <LikeButton
      type="button"
      aria-label={liked ? '찜 해제' : '찜하기'}
      onClick={() => onToggleLike(book)}
    >
      <HeartIcon
        size={size}
        filled={liked}
      />
    </LikeButton>
  );

  if (!expanded) {
    return (
      <Row>
        <Thumbnail>
          {book.thumbnail && (
            <img
              src={book.thumbnail}
              alt={book.title}
              loading="lazy"
            />
          )}
          {likeButton(16)}
        </Thumbnail>
        <TitleGroup>
          <strong>{book.title}</strong>
          <span>{book.authors.join(', ')}</span>
        </TitleGroup>
        <Price>{formatPrice(displayPrice)}</Price>
        <Actions>
          <Button onClick={handlePurchaseClick}>구매하기</Button>
          <Button
            $variant="light"
            onClick={() => setExpanded(true)}
          >
            상세보기
            <ChevronDownIcon />
          </Button>
        </Actions>
      </Row>
    );
  }

  return (
    <ExpandedRow>
      <LargeThumbnail>
        {book.thumbnail && (
          <img
            src={book.thumbnail}
            alt={book.title}
            loading="lazy"
          />
        )}
        {likeButton(24)}
      </LargeThumbnail>
      <Description>
        <TitleGroup>
          <strong>{book.title}</strong>
          <span>{book.authors.join(', ')}</span>
        </TitleGroup>
        <h3>책 소개</h3>
        <p>{book.contents ? `${book.contents}…` : '등록된 책 소개가 없습니다.'}</p>
      </Description>
      <Side>
        <Button
          $variant="light"
          onClick={() => setExpanded(false)}
        >
          상세보기
          <FlippedChevron>
            <ChevronDownIcon />
          </FlippedChevron>
        </Button>
        <PriceTable>
          {hasDiscount ? (
            <>
              <div>
                <span>원가</span>
                <OriginalPrice>{formatPrice(book.price)}</OriginalPrice>
              </div>
              <div>
                <span>할인가</span>
                <SalePrice>{formatPrice(book.sale_price)}</SalePrice>
              </div>
            </>
          ) : (
            <div>
              <span>원가</span>
              <SalePrice>{formatPrice(book.price)}</SalePrice>
            </div>
          )}
        </PriceTable>
        <Button
          onClick={handlePurchaseClick}
          style={{ width: 240 }}
        >
          구매하기
        </Button>
      </Side>
    </ExpandedRow>
  );
});

const LikeButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 48px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
  }
`;

const Thumbnail = styled.div`
  position: relative;
  width: 48px;
  height: 68px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
  padding: 0 32px 0 48px;

  @media (max-width: 768px) {
    padding: 0;
  }

  strong {
    font-size: 18px;
    font-weight: 700;
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
    flex-shrink: 0;
  }
`;

const Price = styled.strong`
  font-size: 18px;
  margin-right: 40px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;

  button {
    width: 115px;
  }
`;

const ExpandedRow = styled.div`
  display: flex;
  gap: 32px;
  padding: 24px 16px 40px 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 24px 16px;
  }
`;

const LargeThumbnail = styled.div`
  position: relative;
  width: 210px;
  height: 280px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    top: 8px;
    right: 8px;
  }
`;

const Description = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 20px;

  > div {
    padding: 0;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    font-size: 10px;
    line-height: 1.6;
    white-space: pre-line;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  flex-shrink: 0;

  > button:first-child {
    width: 115px;
  }

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const FlippedChevron = styled.span`
  display: flex;
  transform: rotate(180deg);
`;

const PriceTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: auto 0 28px;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  span {
    font-size: 10px;
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

const OriginalPrice = styled.s`
  font-size: 18px;
  font-weight: 350;
`;

const SalePrice = styled.strong`
  font-size: 18px;
`;

export default BookItem;
