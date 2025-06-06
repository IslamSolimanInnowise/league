import { css, styled } from "styled-components";

export const Figure = styled.figure`
  ${({ theme }) => {
    const {
      cardBg,
      cardBorderColor,
      cardHoverBg,
      cardHoverBorderColor,
      transition,
    } = theme;

    return css`
      background-color: ${cardBg};
      width: 18rem;
      height: 15rem;
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border: 1px solid ${cardBorderColor};
      transition: ${transition};

      &:hover {
        background-color: ${cardHoverBg};
        border-color: ${cardHoverBorderColor};
      }
    `;
  }}
`;
