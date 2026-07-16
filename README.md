# certicos BOOKS

카카오 도서 검색 API를 활용한 도서 검색 서비스입니다. 도서를 검색해 목록으로 확인하고, 상세 정보 조회 / 구매 페이지 이동 / 찜하기를 할 수 있습니다.

## 실행 방법

```bash
npm install
npm run dev
```

- Node.js 18 이상 권장
- 실행 전 프로젝트 루트에 `.env` 파일이 필요합니다. (제출 메일에 첨부된 `.env`를 루트에 두거나, `.env.example`을 참고해 카카오 REST API 키를 넣어주세요)

```
VITE_KAKAO_REST_API_KEY=카카오_REST_API_키
```

- 실행 후 http://localhost:5173 에서 확인할 수 있습니다.

## 폴더 구조

```
src/
├── api/          # axios 인스턴스, 카카오 도서 검색 API 호출 함수
├── components/
│   ├── common/   # Button, 아이콘 등 도메인과 무관한 공통 컴포넌트
│   ├── books/    # 검색바, 상세검색 팝오버, 도서 리스트/아이템, 빈 화면 등
│   └── layout/   # 헤더(로고, 내비게이션)
├── hooks/        # useBookSearch, useSearchHistory, useWishlist, useIntersectionObserver
├── pages/        # 도서 검색(/), 내가 찜한 책(/wishlist)
├── styles/       # 테마 토큰(컬러), 전역 스타일
├── types/        # 카카오 API 응답, 검색 파라미터 타입
└── utils/        # 가격 포맷 등 순수 함수
```

### 주요 코드

- `hooks/useBookSearch.ts` — `useInfiniteQuery` 기반 검색 훅. 검색어/검색 조건이 queryKey에 포함되어 조건이 바뀌면 자동으로 새 검색이 실행되고, 같은 조건은 캐시를 재사용합니다.
- `hooks/useSearchHistory.ts` — 검색 기록을 localStorage에 최대 8개 저장합니다. 같은 검색어는 맨 앞으로 끌어올리고, 8개를 넘으면 가장 오래된 것부터 지웁니다.
- `hooks/useWishlist.ts` — 찜 목록 관리. 찜한 시점의 도서 데이터를 그대로 저장하기 때문에 이후 API 결과와 다를 수 있다는 기획 전제를 따랐습니다. isbn이 비어 있는 도서가 간혹 있어 제목+저자를 보조 키로 사용합니다.
- `components/books/BookItem.tsx` — 접힘/펼침(아코디언) 두 가지 뷰를 가진 리스트 아이템. 할인가가 없으면 원가만 노출합니다.
- `pages/SearchPage.tsx` — 전체 검색과 상세 검색 상태를 하나의 `params`로 관리해, 한쪽으로 검색하면 다른 쪽 조건이 초기화되는 기획 요구사항을 자연스럽게 처리했습니다.

## 라이브러리 선택 이유

- **@tanstack/react-query** — 서버 상태(검색 결과)의 캐싱·페이지네이션·로딩 상태 관리를 직접 구현하지 않고 선언적으로 처리하기 위해 사용했습니다. 특히 `useInfiniteQuery`가 무한 스크롤 요구사항과 정확히 맞습니다.
- **styled-components** — 컴포넌트 단위로 스타일을 캡슐화하고, 피그마의 컬러 팔레트를 ThemeProvider 토큰으로 관리하기 위해 선택했습니다.
- **react-router-dom** — 도서 검색 / 내가 찜한 책 두 페이지 간 라우팅.
- **axios** — 인스턴스에 baseURL과 인증 헤더를 한 번만 설정해 API 호출부를 단순하게 유지했습니다.

## 강조하고 싶은 기능

- **실시간 추천 검색어** — 입력값을 300ms 디바운스로 조회해 관련 도서 제목을 검색창 아래에 제안합니다. 같은 입력은 React Query 캐시를 재사용해 불필요한 요청을 줄였습니다.
- **무한 스크롤** — 스크롤 이벤트 대신 IntersectionObserver를 사용해 목록 하단 감지 시 다음 10건을 불러옵니다. rootMargin으로 하단 도달 전에 미리 로드해 끊김을 줄였습니다.
- **검색 기록** — 최대 8개, 중복 시 최신으로 갱신, 초과 시 오래된 순 삭제. 브라우저를 재시작해도 유지됩니다.
- **상세 검색** — 제목/저자명/출판사 조건 선택 후 검색하면 카카오 API의 target 파라미터로 조건 검색을 수행합니다. 전체 검색과 상세 검색은 동시에 적용되지 않습니다.
- **찜하기** — 목록/상세 어디서든 하트로 토글할 수 있고, 찜 목록 페이지도 10개 단위로 나눠 렌더링합니다.
- **한글 입력 처리** — IME 조합 중 Enter가 중복 실행되지 않도록 `isComposing`을 확인합니다.
