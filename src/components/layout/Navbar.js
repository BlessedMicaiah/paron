import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search, Settings, Help, Notifications, LightMode } from '@mui/icons-material';

const NavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background: rgba(255, 255, 255, 0.95);
  height: 72px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  backdrop-filter: blur(20px);
  z-index: 50;
  position: sticky;
  top: 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gradient.primary};
    opacity: 0.3;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.lg};
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transition.bounce};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(99, 102, 241, 0.08);
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transform: scale(0);
    transition: ${({ theme }) => theme.transition.normal};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
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
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  margin: 0 ${({ theme }) => theme.spacing.xl};
  width: 340px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transition.normal};
  backdrop-filter: blur(4px);
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.primary};
    background-color: rgba(255, 255, 255, 0.9);
  }

  input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.text};
    margin-left: ${({ theme }) => theme.spacing.sm};

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const ProfileButton = styled(NavButton)`
  background: ${({ theme }) => theme.colors.gradient.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.primary};
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
        <Search style={{ color: '#6366F1' }} />
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
