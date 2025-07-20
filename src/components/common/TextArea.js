import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { Error, CheckCircle } from '@mui/icons-material';

const TextAreaContainer = styled.div`
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

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: 1px solid ${({ theme, $error, $success }) => 
    $error ? theme.colors.error : 
    $success ? theme.colors.success : 
    theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  resize: vertical;
  transition: ${({ theme }) => theme.transition.fast};
  
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
    resize: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
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

const CharacterCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme, $isOverLimit }) => 
    $isOverLimit ? theme.colors.error : theme.colors.textSecondary
  };
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const TextArea = forwardRef(({
  label,
  helperText,
  error,
  success,
  required = false,
  maxLength,
  showCharacterCount = false,
  className,
  value = '',
  ...props
}, ref) => {
  const characterCount = value.length;
  const isOverLimit = maxLength && characterCount > maxLength;

  return (
    <TextAreaContainer className={className}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      
      <StyledTextArea
        ref={ref}
        value={value}
        maxLength={maxLength}
        $error={!!error}
        $success={!!success}
        aria-invalid={!!error}
        aria-describedby={helperText ? `${props.id}-helper` : undefined}
        {...props}
      />
      
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
      
      {showCharacterCount && maxLength && (
        <CharacterCount $isOverLimit={isOverLimit}>
          {characterCount}/{maxLength}
        </CharacterCount>
      )}
    </TextAreaContainer>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;