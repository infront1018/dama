import { createGlobalStyle } from "styled-components";

export const theme = {
  main: "#ffaa18",
  sub: "#ffbb56",
  background: "#fffdfa",
  text: "#334",
  gray: "#888",
};

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    background: #fffdfa;
    min-height: 100%;
    font-family: 'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'sans-serif';
    color: #334;
    letter-spacing: 0.01em;
    font-size: 16px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button, input, textarea, select {
    font-family: inherit;
    outline: none;
    border: none;
    background: none;
  }
  ::selection {
    background: #ffe2b7;
  }

  @media (max-width: 600px) {
    html {
      font-size: 15px;
    }
  }
`;

