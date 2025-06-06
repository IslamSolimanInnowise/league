import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    color: string;
    transition: string;
    cardBg: string;
    cardBorderColor: string;
    cardHoverBg: string;
    cardHoverBorderColor: string;
  }
}
