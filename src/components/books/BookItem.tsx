import styled from 'styled-components';
import type { Book } from '../../types/book';
import formatPrice from '../../utils/format';
import { Button } from '../common/Button';

type Props = {
  book: Book;
};

const BookItem = ({ book }: Props) => {
  const hasDiscount = book.sale_price > 0 && book.sale_price < book.price;
  const displayPrice = hasDiscount ? book.sale_price : book.price;

  const openPurchasePage = () => {
    window.open(book.url, '_blank', 'noopener,noreferrer');
  };

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
      </Thumbnail>
      <TitleGroup>
        <strong>{book.title}</strong>
        <span>{book.authors.join(', ')}</span>
      </TitleGroup>
      <Price>{formatPrice(displayPrice)}</Price>
      <Actions>
        <Button onClick={openPurchasePage}>구매하기</Button>
      </Actions>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 48px;
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

export default BookItem;
