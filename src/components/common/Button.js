import React from 'react';
import styled, { css } from 'styled-components';
import { CircularProgress } from '@mui/material';

// Button variants
const buttonVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.gradient.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: ${({ theme }) => theme.shadows.sm};
    }
  `,
  
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceHover};
      border-color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-1px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => `${theme.colors.primary}11`};
      transform: translateY(-1px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      background: ${({ theme }) => `${theme.colors.primary}22`};
    }
  `,
  
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: none;
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceHover};
      transform: translateY(-1px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  
  danger: css`
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    
    &:hover:not(:disabled) {
      background: #DC2626;
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
};

// Button sizes
const buttonSizes = {
  sm: css`
    height: ${({ theme }) => theme.sizes.button.sm.height};
    padding: ${({ theme }) => theme.sizes.button.sm.padding};
    font-size: ${({ theme }) => theme.sizes.button.sm.fontSize};
    min-width: 80px;
  `,
  
  md: css`
    height: ${({ theme }) => theme.sizes.button.md.height};
    padding: ${({ theme }) => theme.sizes.button.md.padding};
    font-size: ${({ theme }) => theme.sizes.button.md.fontSize};
    min-width: 100px;
  `,
  
  lg: css`
    height: ${({ theme }) => theme.sizes.button.lg.height};
    padding: ${({ theme }) => theme.sizes.button.lg.padding};
    font-size: ${({ theme }) => theme.sizes.button.lg.fontSize};
    min-width: 120px;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none;
  
  // Apply variant styles
  ${({ $variant }) => buttonVariants[$variant] || buttonVariants.primary}
  
  // Apply size styles
  ${({ $size }) => buttonSizes[$size] || buttonSizes.md}
  
  // Full width option
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  // Disabled state
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  // Loading state
  ${({ $loading }) => $loading && css`
    color: transparent;
    pointer-events: none;
  `}
  
  // Focus styles for accessibility
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  // Icon spacing
  svg {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
`;

const LoadingSpinner = styled(CircularProgress)`
  position: absolute !important;
  color: currentColor;
`;

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  className,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const handleClick = (event) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <StyledButton
      ref={ref}
      type={type}
      $variant={variant}
      $size={size}
      $loading={loading}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
          thickness={4}
        />
      )}
      {startIcon && !loading && startIcon}
      {children}
      {endIcon && !loading && endIcon}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;