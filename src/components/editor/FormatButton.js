import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.active ? 'rgba(59, 130, 246, 0.1)' : 'transparent'};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${props => props.active ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.08);
    color: ${theme.colors.primary};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: ${props => props.active ? '80%' : '0'};
    background: ${theme.colors.gradient.primary};
    bottom: 5px;
    left: 10%;
    transition: width 0.2s ease;
    border-radius: ${theme.borderRadius.full};
  }
  
  &:hover::after {
    width: ${props => props.active ? '80%' : '40%'};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const FormatButton = ({ icon, command, value, active, onCommand }) => {
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
    <Button onClick={handleClick} active={active}>
      {icon}
    </Button>
  );
};

export default FormatButton;
