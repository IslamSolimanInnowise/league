import Modal from "@/shared/ui/Modal";
import styled, { css } from "styled-components";

export const StyledModal = styled(Modal)`
  padding: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 75%;
  height: 75%;
  border: 1px solid ${({ theme }) => theme.cardBorderColor};
  overflow: hidden;
  border-radius: 1rem;
`;

export const closeButton = styled.button`
  ${({ theme }) => {
    const {
      cardBtnColor,
      transition,
      cardBtnHoverBg,
      cardBtnHoverColor,
      cardBtnBorderColor,
    } = theme;

    return css`
    position: absolute;
    width: 100px;
    height: 50px;
    right: 1rem;
    top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 900;
    border: 1px solid ${cardBtnBorderColor};
    border-radius: inherit;
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
  border-radius: inherit;
`;
