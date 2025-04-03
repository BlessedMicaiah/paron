import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu, Search, Settings, Help, Notifications, NightlightRound } from '@mui/icons-material';
import theme from '../../styles/theme';

const NavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.white};
  height: 70px;
  border-bottom: 1px solid ${theme.colors.gray};
  box-shadow: ${theme.shadows.sm};
  backdrop-filter: ${theme.glass.backdropFilter};
  z-index: 10;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${theme.colors.gradient.primary};
  }
`;

const Logo = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: bold;
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 50%;
    height: 2px;
    background: ${theme.colors.accent};
    box-shadow: ${theme.shadows.accent};
  }
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
  color: ${theme.colors.text};
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
    background: rgba(212, 175, 55, 0.1);
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
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  margin: 0 ${theme.spacing.xl};
  width: 340px;
  border: 1px solid ${theme.colors.gray};
  transition: ${theme.transition.normal};
  
  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.gold};
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
    box-shadow: ${theme.shadows.gold};
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavButton className="pulse">
          <Menu />
        </NavButton>
        <Logo className="gold-text">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Paron
          </Link>
        </Logo>
      </div>

      <SearchBar>
        <Search style={{ color: theme.colors.primary }} />
        <input placeholder="Search presentations..." />
      </SearchBar>

      <NavActions>
        <NavButton>
          <NightlightRound />
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
