import type { FC, ReactNode } from 'react';
import { StyledButton } from './Button.styles';
import { Centered } from '../../styles/styled-components';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled, type = 'button' }) => {
  return (
    <Centered>
      <StyledButton onClick={onClick} disabled={disabled} type={type}>
        {children}
      </StyledButton>
    </Centered>
  );
};