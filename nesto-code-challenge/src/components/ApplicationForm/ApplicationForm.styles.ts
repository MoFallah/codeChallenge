import styled from "styled-components";

export const FormWrapper = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem;
  border: 1px solid #000;
  border-radius: 0.5rem;
`;

export const Title = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 4.5rem;
  gap: 0.25rem;
  width: 100%;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "#000")};
  border-radius: 0.25rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "red" : "var(--primary-color)")};
  }
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 0.85rem;
`;