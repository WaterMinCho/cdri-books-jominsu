import styled from 'styled-components';
import type { Book } from '../../types/book';
import BookItem from './BookItem';

type Props = {
  books: Book[];
  isLiked: (book: Book) => boolean;
  onToggleLike: (book: Book) => void;
};

const BookList = ({ books, isLiked, onToggleLike }: Props) => {
  return (
    <List>
      {books.map((book, index) => (
        <li key={`${book.isbn}-${index}`}>
          <BookItem
            book={book}
            liked={isLiked(book)}
            onToggleLike={onToggleLike}
          />
        </li>
      ))}
    </List>
  );
};

const List = styled.ul`
  li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }
`;

export default BookList;
