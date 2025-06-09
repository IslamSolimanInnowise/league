import styled, { css } from "styled-components";
import Modal from "../../ui/Modal";

export const StyledModal = styled(Modal)`
  padding: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 90%;
  height: 90%;
  overflow: hidden;
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
    right: 50px;
    top: 50px;
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
