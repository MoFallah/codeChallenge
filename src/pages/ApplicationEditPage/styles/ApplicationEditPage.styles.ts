import styled from "styled-components";
import { flexContainer } from "../../../styles/styled-components";

export const ApplicationEditPageWrapper = styled.div`
  ${flexContainer}

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const ProductWrapper = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 45%;
  }
    
  @media (min-width: 1024px) {
    width: 35%;
    max-width: 25rem;
  }
`;

export const ApplicationWrapper = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 45%;
  }
    
  @media (min-width: 1024px) {
    width: 55%;
    max-width: 40rem;
  }
`;
