import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const theme: DefaultTheme = {
  color: {
    primary: '#0984e3',
    red: '#d63031',
    green: '#00b894',
    black: '#2d3436',
    white: '#ffffff',
  },
  fontSize: {
    small: '1.4rem',
    medium: '1.6rem',
    big: '2rem',
  },
  fontWeight: {
    regular: '400',
    semiBold: '600',
  },
};

export const GlobalStyles = createGlobalStyle`
  *,*::after,*::before{
    box-sizing: border-box;
  }

  html{
      font-size:62.5%;
  }

  body{
      margin:0;
      font-size:1.6rem;
      color:${theme.color.black};
      font-family: 'Roboto', sans-serif;
  }
`;
