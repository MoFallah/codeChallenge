import styled from "styled-components";

export const GridWrapper = styled.div`
  width: 100%;
  height: 20rem;

  @media (min-width: 1024px) {
    height: 40rem;
  }
`;

export const ActionSpan = styled.span`
  color: var(--primary-color);
  cursor: pointer;
  position: relative;
  transition: border-bottom 0.2s;
  padding-bottom: 0.25rem;

  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid var(--primary-color);
  }
`;