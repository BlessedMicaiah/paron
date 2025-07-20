import React, { useState, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { Visibility, VisibilityOff, Error, CheckCircle } from '@mui/icons-material';

// Input container with validation states
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  
  ${({ required }) => required && css`
    &::after {
      content: ' *';
      color: ${({ theme }) => theme.colors.error};
    }
  `}
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme, $error, $success }) => 
    $error ? theme.colors.error : 
    $success ? theme.colors.success : 
    theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: ${({ theme }) => theme.transition.fast};
  
  // Apply size styles
  ${({ $size, theme }) => {
    const sizeConfig = theme.sizes.input[$size] || theme.sizes.input.md;
    return css`
      height: ${sizeConfig.height};
      padding: ${sizeConfig.padding};
      font-size: ${sizeConfig.fontSize};
    `;
  }}
  
  // Padding adjustment for icons
  ${({ $hasStartIcon }) => $hasStartIcon && css`
    padding-left: 40px;
  `}
  
  ${({ $hasEndIcon }) => $hasEndIcon && css`
    padding-right: 40px;
  `}
  
  &:focus {
    outline: none;
    border-color: ${({ theme, $error }) => 
      $error ? theme.colors.error : theme.colors.primary
    };
    box-shadow: 0 0 0 2px ${({ theme, $error }) => 
      $error ? `${theme.colors.error}33` : `${theme.colors.primary}33`
    };
  }
  
  &:hover:not(:focus) {
    border-color: ${({ theme, $error, $success }) => 
      $error ? theme.colors.error : 
      $success ? theme.colors.success : 
      theme.colors.borderDark
    };
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $error, $success }) => 
    $error ? theme.colors.error : 
    $success ? theme.colors.success : 
    theme.colors.textSecondary
  };
  pointer-events: ${({ $clickable }) => $clickable ? 'auto' : 'none'};
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  
  ${({ $position }) => $position === 'start' ? css`
    left: 12px;
  ` : css`
    right: 12px;
  `}
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const HelperText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme, $error, $success }) => 
    $error ? theme.colors.error : 
    $success ? theme.colors.success : 
    theme.colors.textSecondary
  };
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Input = forwardRef(({
  label,
  helperText,
  error,
  success,
  required = false,
  size = 'md',
  type = 'text',
  startIcon,
  endIcon,
  showPasswordToggle = false,
  className,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  React.useEffect(() => {
    if (type === 'password' && showPasswordToggle) {
      setInputType(showPassword ? 'text' : 'password');
    } else {
      setInputType(type);
    }
  }, [type, showPassword, showPasswordToggle]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hasStartIcon = !!startIcon;
  const hasEndIcon = !!endIcon || (type === 'password' && showPasswordToggle) || error || success;

  const renderEndIcon = () => {
    if (type === 'password' && showPasswordToggle) {
      return (
        <IconWrapper 
          $position="end" 
          $clickable 
          onClick={togglePasswordVisibility}
          $error={error}
          $success={success}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconWrapper>
      );
    }
    
    if (error) {
      return (
        <IconWrapper $position="end" $error>
          <Error />
        </IconWrapper>
      );
    }
    
    if (success) {
      return (
        <IconWrapper $position="end" $success>
          <CheckCircle />
        </IconWrapper>
      );
    }
    
    if (endIcon) {
      return (
        <IconWrapper $position="end">
          {endIcon}
        </IconWrapper>
      );
    }
    
    return null;
  };

  return (
    <InputContainer className={className}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      
      <InputWrapper>
        {startIcon && (
          <IconWrapper $position="start" $error={error} $success={success}>
            {startIcon}
          </IconWrapper>
        )}
        
        <StyledInput
          ref={ref}
          type={inputType}
          $size={size}
          $error={!!error}
          $success={!!success}
          $hasStartIcon={hasStartIcon}
          $hasEndIcon={hasEndIcon}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        
        {renderEndIcon()}
      </InputWrapper>
      
      {(helperText || error) && (
        <HelperText 
          id={`${props.id}-helper`}
          $error={!!error}
          $success={!!success}
        >
          {error && <Error />}
          {success && !error && <CheckCircle />}
          {error || helperText}
        </HelperText>
      )}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;