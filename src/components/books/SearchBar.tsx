import { useState } from 'react';
import styled from 'styled-components';
import { CloseIcon, SearchIcon } from '../common/icons';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  history: string[];
  onRemoveHistory: (keyword: string) => void;
};

const SearchBar = ({ value, onChange, onSearch, history, onRemoveHistory }: Props) => {
  const [focused, setFocused] = useState(false);
  const showHistory = focused && history.length > 0;

  const submit = (keyword: string) => {
    if (!keyword.trim()) return;
    onChange(keyword);
    onSearch(keyword);
    setFocused(false);
  };

  return (
    <Container>
      <InputBox $open={showHistory}>
        <SearchIcon />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) submit(value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="검색어를 입력하세요"
        />
      </InputBox>
      {showHistory && (
        <HistoryList onMouseDown={(e) => e.preventDefault()}>
          {history.map((keyword) => (
            <HistoryItem key={keyword}>
              <button
                type="button"
                onClick={() => submit(keyword)}
              >
                {keyword}
              </button>
              <RemoveButton
                type="button"
                aria-label={`${keyword} 검색 기록 삭제`}
                onClick={() => onRemoveHistory(keyword)}
              >
                <CloseIcon />
              </RemoveButton>
            </HistoryItem>
          ))}
        </HistoryList>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 480px;
`;

const InputBox = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 50px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ $open }) => ($open ? '24px 24px 0 0' : '24px')};

  input {
    flex: 1;
    font-size: 16px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.subtitle};
    }
  }
`;

const HistoryList = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  padding: 4px 0 20px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0 0 24px 24px;
  z-index: 10;
`;

const HistoryItem = styled.li`
  display: flex;
  align-items: center;

  > button:first-child {
    flex: 1;
    padding: 8px 12px 8px 48px;
    text-align: left;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

const RemoveButton = styled.button`
  display: flex;
  padding: 8px 24px 8px 8px;
`;

export default SearchBar;
