import styled, { css } from 'styled-components';

interface ButtonProps {
  variation: 'primary' | 'secondary' | 'outline' | 'ghost';
  onClick?: () => void;
  children: React.ReactNode;
}

const primaryStyle = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
`;

const secondaryStyle = css`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const outlineStyle = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const ghostStyle = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
`;

const Button = styled.button<ButtonProps>`
  border: none;

  ${({ variation }) => {
    switch (variation) {
      case 'primary':
        return primaryStyle;
      case 'secondary':
        return secondaryStyle;
      case 'outline':
        return outlineStyle;
      case 'ghost':
        return ghostStyle;
      default:
        return primaryStyle;
    }
  }};
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 8px;


  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
