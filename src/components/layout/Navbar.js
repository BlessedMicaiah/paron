import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search, Settings, Help, Notifications, LightMode } from '@mui/icons-material';
import theme from '../../styles/theme';

const NavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: rgba(255, 255, 255, 0.9);
  height: 70px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: ${theme.shadows.sm};
  backdrop-filter: blur(10px);
  z-index: 10;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${theme.colors.gradient.primary};
    opacity: 0.2;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${theme.spacing.lg};
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  width: 42px;
  height: 42px;
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transition.bounce};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(59, 130, 246, 0.08);
    border-radius: ${theme.borderRadius.md};
    transform: scale(0);
    transition: ${theme.transition.normal};
  }

  &:hover {
    color: ${theme.colors.primary};
    transform: translateY(-2px);
    
    &:before {
      transform: scale(1);
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  margin: 0 ${theme.spacing.xl};
  width: 340px;
  border: 1px solid ${theme.colors.gray};
  transition: ${theme.transition.normal};
  backdrop-filter: blur(4px);
  
  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.primary};
    background-color: rgba(255, 255, 255, 0.9);
  }

  input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    margin-left: ${theme.spacing.sm};

    &::placeholder {
      color: ${theme.colors.textSecondary};
    }
  }
`;

const ProfileButton = styled(NavButton)`
  background: ${theme.colors.gradient.primary};
  color: ${theme.colors.white};
  font-weight: 600;
  
  &:hover {
    color: ${theme.colors.white};
    box-shadow: ${theme.shadows.primary};
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <LogoContainer>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <LogoImage src="/paron-high-resolution-logo.png" alt="Paron Logo" />
        </Link>
      </LogoContainer>

      <SearchBar>
        <Search style={{ color: theme.colors.primary }} />
        <input placeholder="Search presentations..." />
      </SearchBar>

      <NavActions>
        <NavButton>
          <LightMode />
        </NavButton>
        <NavButton>
          <Notifications />
        </NavButton>
        <NavButton>
          <Help />
        </NavButton>
        <NavButton>
          <Settings />
        </NavButton>
        <ProfileButton>
          PC
        </ProfileButton>
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;
