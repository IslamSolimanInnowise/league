import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string;
    color: string;
    transition: string;
    // Card
    cardBg: string;
    cardBorderColor: string;
    cardHoverBg: string;
    cardHoverBorderColor: string;
    cardBtnColor: string;
    cardBtnBorderColor: string;
    cardBtnHoverColor: string;
    cardBtnHoverBg: string;

    // Header
    headerBg: string;
    headerShadow: string;

    errorColor: string;
    loadingColor: string;
  }
}
