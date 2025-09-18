import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div<{ size: number; color: string }>`
  border: ${({ size }) => `${size / 8}px solid #f3f3f3`};
  border-top: ${({ size, color }) => `${size / 8}px solid ${color}`};
  border-radius: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  animation: ${spin} 1s linear infinite;
  display: inline-block;
`;

