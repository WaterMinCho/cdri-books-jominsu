import styled from 'styled-components';
import type { Book } from '../../types/book';
import BookItem from './BookItem';

type Props = {
  books: Book[];
};

const BookList = ({ books }: Props) => {
  return (
    <List>
      {books.map((book, index) => (
        <li key={`${book.isbn}-${index}`}>
          <BookItem book={book} />
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
