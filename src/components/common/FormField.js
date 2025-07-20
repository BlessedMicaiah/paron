import React from 'react';
import styled from 'styled-components';

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormField = ({ children, className, ...props }) => {
  return (
    <FormFieldContainer className={className} {...props}>
      {children}
    </FormFieldContainer>
  );
};

export default FormField;