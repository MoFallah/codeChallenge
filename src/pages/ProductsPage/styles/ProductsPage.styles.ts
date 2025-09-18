import styled from "styled-components";
import { flexContainer } from "../../../styles/styled-components";

export const ProductsPageWrapper = styled.div`
  ${flexContainer}

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const ProductCardWrapper = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 45%;
  }
    
  @media (min-width: 1024px) {
    width: 40%;
    max-width: 35rem;
  }

`;