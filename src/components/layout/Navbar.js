import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu, Search, Settings, Help } from '@mui/icons-material';
import theme from '../../styles/theme';

const NavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.white};
  height: 64px;
  border-bottom: 1px solid ${theme.colors.gray};
  box-shadow: ${theme.shadows.sm};
  z-index: 10;
`;

const Logo = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  font-weight: bold;
  color: ${theme.colors.primary};
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
  color: ${theme.colors.darkGray};
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transition.fast};

  &:hover {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.primary};
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  margin: 0 ${theme.spacing.xl};
  width: 300px;

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
      color: ${theme.colors.darkGray};
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavButton>
          <Menu />
        </NavButton>
        <Logo>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Paron
          </Link>
        </Logo>
      </div>

      <SearchBar>
        <Search style={{ color: theme.colors.darkGray }} />
        <input placeholder="Search..." />
      </SearchBar>

      <NavActions>
        <NavButton>
          <Help />
        </NavButton>
        <NavButton>
          <Settings />
        </NavButton>
        <NavButton style={{ 
          backgroundColor: theme.colors.primary, 
          color: theme.colors.white 
        }}>
          PC
        </NavButton>
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;
