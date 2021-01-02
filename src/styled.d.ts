import 'styled-components';

interface ThemeObject {
  [key: string]: string;
}
// extend theme
declare module 'styled-components' {
  export interface DefaultTheme {
    color: ThemeObject;
    fontSize: ThemeObject;
    fontWeight: ThemeObject;
  }
}
