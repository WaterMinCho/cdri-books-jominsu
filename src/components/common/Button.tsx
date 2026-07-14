import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'light' | 'outline';
type ButtonSize = 'md' | 'sm';

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  `,
  light: css`
    background: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,
  outline: css`
    border: 1px solid ${({ theme }) => theme.colors.text.subtitle};
    color: ${({ theme }) => theme.colors.text.subtitle};
  `,
};

const sizeStyles = {
  md: css`
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
  `,
  sm: css`
    height: 36px;
    padding: 0 10px;
    font-size: 14px;
  `,
};

export const Button = styled.button<{ $variant?: ButtonVariant; $size?: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 8px;
  white-space: nowrap;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${({ $size = 'md' }) => sizeStyles[$size]}
`;
