export type Book = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};

export type BookSearchResponse = {
  documents: Book[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
};

export type SearchTarget = 'title' | 'person' | 'publisher';

export type BookSearchParams = {
  query: string;
  target?: SearchTarget;
};
