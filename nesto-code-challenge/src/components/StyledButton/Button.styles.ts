import styled from "styled-components";

export const StyledButton = styled.button`
  width: 60%;
  max-width: 25rem;
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 1rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-bottom: 2rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--primary-color);
    color: #fff;
  }

  &:hover {
    background-color: var(--primary-color);
    color: #fff;
  }
`;