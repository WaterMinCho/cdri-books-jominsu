import styled from 'styled-components';
import { BookIcon } from '../common/icons';

type Props = {
  message: string;
};

const EmptyState = ({ message }: Props) => {
  return (
    <Wrapper>
      <BookIcon />
      <p>{message}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 120px 0;

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export default EmptyState;
