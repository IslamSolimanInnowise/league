import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    color: string;
    transition: string;
    // Card
    cardBg: string;
    cardBorderColor: string;
    cardHoverBg: string;
    cardHoverBorderColor: string;

    // Header
    headerBg: string;
    headerShadow: string;

    errorColor: string;
  }
}
