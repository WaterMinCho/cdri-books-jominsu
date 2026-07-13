import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.white};
  }

  button {
    font: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  input {
    font: inherit;
    border: none;
    outline: none;
    background: transparent;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
