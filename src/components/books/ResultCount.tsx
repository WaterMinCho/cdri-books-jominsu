import styled from 'styled-components';

type Props = {
  label: string;
  count: number;
};

const ResultCount = ({ label, count }: Props) => {
  return (
    <Wrapper>
      {label}
      <span>
        총 <em>{count.toLocaleString('ko-KR')}</em>건
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.p`
  display: flex;
  gap: 16px;
  font-size: 16px;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default ResultCount;
