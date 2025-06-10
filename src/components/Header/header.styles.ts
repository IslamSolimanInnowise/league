import styled, { css } from 'styled-components';

export const Header = styled.header`
  ${({ theme }) => {
    const { headerBg, headerShadow } = theme;

    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5rem;
      background-color: ${headerBg};
      padding: 1rem;
      margin-bottom: 2rem;
      box-shadow: ${headerShadow};
    `;
  }}
`;

export const Logo = styled.img`
  width: 4rem;
  object-fit: cover;
`;

export const Input = styled.input`
  padding: 0.5rem;
  outline: none;
  border: 1px solid;
  border-radius: 0.5rem;
`;
