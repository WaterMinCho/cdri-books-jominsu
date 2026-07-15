import { useState } from 'react';
import styled from 'styled-components';
import type { SearchTarget } from '../../types/book';
import { Button } from '../common/Button';
import { ChevronDownIcon, CloseIcon } from '../common/icons';

const TARGET_LABELS: Record<SearchTarget, string> = {
  title: '제목',
  person: '저자명',
  publisher: '출판사',
};

type Props = {
  onClose: () => void;
  onSearch: (target: SearchTarget, keyword: string) => void;
};

const DetailSearchPopover = ({ onClose, onSearch }: Props) => {
  const [target, setTarget] = useState<SearchTarget>('title');
  const [keyword, setKeyword] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);

  const submit = () => {
    if (!keyword.trim()) return;
    onSearch(target, keyword.trim());
  };

  return (
    <Popover>
      <CloseButton
        type="button"
        aria-label="상세검색 닫기"
        onClick={onClose}
      >
        <CloseIcon />
      </CloseButton>
      <Row>
        <SelectBox>
          <SelectTrigger
            type="button"
            onClick={() => setSelectOpen((open) => !open)}
          >
            {TARGET_LABELS[target]}
            <ChevronDownIcon />
          </SelectTrigger>
          {selectOpen && (
            <Options>
              {(Object.keys(TARGET_LABELS) as SearchTarget[]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      setTarget(key);
                      setSelectOpen(false);
                    }}
                  >
                    {TARGET_LABELS[key]}
                  </button>
                </li>
              ))}
            </Options>
          )}
        </SelectBox>
        <KeywordInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          placeholder="검색어 입력"
          autoFocus
        />
      </Row>
      <Button
        $size="sm"
        onClick={submit}
        style={{ width: '100%' }}
      >
        검색하기
      </Button>
    </Popover>
  );
};

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
  padding: 36px 24px 24px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 14px 6px rgba(151, 151, 151, 0.15);
  z-index: 20;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  padding: 4px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100px;
`;

const SelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 4px;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const Options = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  button {
    width: 100%;
    padding: 8px 4px;
    text-align: left;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};

    &:hover {
      background: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;

const KeywordInput = styled.input`
  flex: 1;
  padding: 8px 4px;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

export default DetailSearchPopover;
