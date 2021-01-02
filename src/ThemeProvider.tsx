import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from './theme';

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = (props: Props) => {
  const { children } = props;
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
