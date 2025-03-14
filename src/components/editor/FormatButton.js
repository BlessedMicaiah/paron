import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${props => props.active ? theme.colors.primary : theme.colors.darkGray};
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const FormatButton = ({ icon, command, value, onCommand }) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // If value is a function, execute it to get the actual value
    let actualValue = value;
    if (typeof value === 'function') {
      actualValue = value();
    }
    
    if (onCommand) {
      onCommand(command, actualValue);
    }
  };
  
  return (
    <Button onClick={handleClick}>
      {icon}
    </Button>
  );
};

export default FormatButton;
