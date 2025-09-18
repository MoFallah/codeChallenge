import styled from "styled-components";

export const StyledProductCard = styled.div<{ $selectable: boolean }>`
  width: 100%;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  transition: box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  ${({ $selectable }) =>
    $selectable &&
    `
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transform: translateY(-1px) translateX(1px);
      }
    `}
`;

export const ProductType = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;

export const ProductName = styled.p`
  height: 2rem;
`;

export const ProductRate = styled.p`
  font-weight: bold;
  font-size: 6rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }

  @media (min-width: 1024px) {
    font-size: 6rem;
  }
`;