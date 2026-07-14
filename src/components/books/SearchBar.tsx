import styled from 'styled-components';
import { SearchIcon } from '../common/icons';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (keyword: string) => void;
};

const SearchBar = ({ value, onChange, onSearch }: Props) => {
  const submit = (keyword: string) => {
    if (!keyword.trim()) return;
    onSearch(keyword);
  };

  return (
    <InputBox>
      <SearchIcon />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit(value);
        }}
        placeholder="검색어를 입력하세요"
      />
    </InputBox>
  );
};

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 480px;
  height: 50px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 24px;

  input {
    flex: 1;
    font-size: 16px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.subtitle};
    }
  }
`;

export default SearchBar;
