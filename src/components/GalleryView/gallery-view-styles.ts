import styled from "styled-components";

export const ErrorP = styled.p`
  color: ${({ theme }) => theme.errorColor};
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem auto;
`;

export const LoadingH2 = styled.h2`
  color: ${({ theme }) => theme.loadingColor};
  text-align: center;
  margin-top: 2rem;
`;

export const ErrorH2 = styled.h2`
  color: ${({ theme }) => theme.errorColor};
  text-align: center;
  margin-top: 2rem;
`;
