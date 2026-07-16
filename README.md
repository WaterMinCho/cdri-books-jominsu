# 📚 certicos BOOKS

카카오 도서 검색 API를 활용한 도서 검색 서비스입니다.
도서 검색, 상세 정보 확인, 구매 페이지 이동, 찜하기 기능을 제공합니다.

## 🚀 실행 방법

```bash
npm install
npm run dev
```

- Node.js 18 이상 권장
- 실행 전 프로젝트 루트에 `.env` 파일이 필요합니다. (메일로 전달드린 `.env`를 루트에 넣어주세요. 형식은 `.env.example` 참고)
- 실행 후 http://localhost:5173 접속

## ⚙️ 기술 스택 및 선택 이유

| 구분      | 기술                  | 선택 이유                                                              |
| --------- | --------------------- | ---------------------------------------------------------------------- |
| 코어      | React 18 + TypeScript + Vite | 필수 스택 + 빠른 개발 서버                                       |
| 서버 상태 | @tanstack/react-query | 검색 결과 캐싱, 무한 스크롤(useInfiniteQuery)을 선언적으로 처리         |
| 스타일    | styled-components     | 컴포넌트 단위 캡슐화, 피그마 컬러 팔레트를 테마 토큰으로 관리           |
| 라우팅    | react-router-dom      | 도서 검색 / 내가 찜한 책 페이지 전환                                    |
| HTTP      | axios                 | 인스턴스에 baseURL과 인증 헤더를 한 번만 설정                           |

## 📂 폴더 구조

```
src/
├── api/          # axios 인스턴스, 도서 검색 API
├── components/
│   ├── common/   # Button, Toast, 아이콘 등 공통 컴포넌트
│   ├── books/    # 검색바, 상세검색 팝업, 도서 리스트/아이템, 빈 화면
│   └── layout/   # 헤더
├── hooks/        # useBookSearch, useSearchHistory, useWishlist,
│                 # useSearchSuggestions, useDebounce, useIntersectionObserver, useClickOutside
├── pages/        # 도서 검색(/), 내가 찜한 책(/wishlist)
├── styles/       # 테마 토큰, 전역 스타일
├── types/        # 카카오 API 응답 타입
└── utils/        # 가격 포맷, 에러 메시지 변환
```

### 주요 코드

- `useBookSearch`: useInfiniteQuery 기반 검색 훅. 검색 조건이 queryKey에 들어가 있어서 조건이 바뀌면 새로 검색되고, 같은 조건은 캐시를 재사용
- `useSearchHistory`: 검색 기록 최대 8개 저장. 중복 검색어는 맨 앞으로 이동, 넘치면 오래된 것부터 삭제
- `useWishlist`: 찜한 시점의 도서 데이터를 localStorage에 그대로 저장 (이후 API 결과와 다를 수 있음). isbn이 빈 도서가 간혹 있어서 제목+저자를 보조 키로 사용
- `BookItem`: 접힘/펼침 아코디언 아이템. 할인가가 없으면 원가만 노출
- `SearchPage`: 전체 검색과 상세 검색을 하나의 상태로 관리해서 한쪽을 실행하면 다른 쪽 조건이 초기화됨

## ✨ 강조하고 싶은 기능

- 실시간 추천 검색어: 입력값을 300ms 디바운스로 조회해서 관련 도서 제목을 제안. 같은 입력은 캐시 재사용
- 무한 스크롤: IntersectionObserver로 목록 하단 감지, 10건씩 추가 로드. rootMargin으로 미리 불러와서 끊김 최소화
- 검색 기록: 브라우저를 다시 켜도 유지. X 버튼으로 개별 삭제
- 상세 검색: 제목/저자명/출판사 조건 검색(target 파라미터). 팝업 바깥 클릭 시 자동 닫힘
- 찜하기: 목록/상세 어디서든 하트로 토글. 찜 목록도 10개 단위로 나눠 렌더링
- 에러 처리: 서버 에러를 그대로 노출하지 않고 상태코드별 안내 토스트로 변환
- 한글 입력: IME 조합 중 Enter가 두 번 실행되지 않도록 처리
- 리스트 성능: BookItem memo 적용으로 페이지 추가 로드 시 기존 아이템 리렌더 방지
