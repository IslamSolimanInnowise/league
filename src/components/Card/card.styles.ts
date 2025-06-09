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
      height: 18rem;
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

export const Thumbnail = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
`;

export const Button = styled.button`
  ${({ theme }) => {
    const {
      cardBtnColor,
      transition,
      cardBtnHoverBg,
      cardBtnHoverColor,
      cardBtnBorderColor,
    } = theme;

    return css`
padding: 0.5rem 1rem;
  border: 1px solid ${cardBtnBorderColor};
  border-radius: 0.5rem;
  color:${cardBtnColor};
  cursor: pointer;
  transition: ${transition};
  &:hover {
    background-color: ${cardBtnHoverBg};
    color: ${cardBtnHoverColor};
    `;
  }}
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
