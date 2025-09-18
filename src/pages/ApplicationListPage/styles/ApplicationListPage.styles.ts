import styled from "styled-components";
import { flexContainer } from "../../../styles/styled-components";

export const Page = styled.div`
  ${flexContainer}

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const ListWrapper = styled.div`
  width: 100%;
`;

export const FormWrapper = styled.div`
  width: 100%;
    
  @media (min-width: 1024px) {
    width: 40%;
    max-width: 35rem;
  }
`;