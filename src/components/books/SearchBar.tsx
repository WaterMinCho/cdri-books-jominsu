import { useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import useSearchSuggestions from '../../hooks/useSearchSuggestions';
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
  const debouncedValue = useDebounce(value, 300);
  const suggestions = useSearchSuggestions(focused ? debouncedValue : '');

  const showSuggestions = focused && value.trim().length > 0 && suggestions.length > 0;
  const showHistory = focused && value.trim().length === 0 && history.length > 0;
  const open = showSuggestions || showHistory;

  const handleSubmit = (keyword: string) => {
    if (!keyword.trim()) return;
    onChange(keyword);
    onSearch(keyword);
    setFocused(false);
  };

  return (
    <Container>
      <InputBox $open={open}>
        <SearchIcon />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSubmit(value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="검색어를 입력하세요"
        />
      </InputBox>
      {open && (
        <Dropdown onMouseDown={(e) => e.preventDefault()}>
          {showSuggestions
            ? suggestions.map((title) => (
                <li key={title}>
                  <SuggestionButton
                    type="button"
                    onClick={() => handleSubmit(title)}
                  >
                    {title}
                  </SuggestionButton>
                </li>
              ))
            : history.map((keyword) => (
                <HistoryItem key={keyword}>
                  <button
                    type="button"
                    onClick={() => handleSubmit(keyword)}
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
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 480px;
  max-width: 100%;
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

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  padding: 4px 0 20px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0 0 24px 24px;
  z-index: 10;
`;

const SuggestionButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 24px 8px 48px;
  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
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
