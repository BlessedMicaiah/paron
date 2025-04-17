import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Dashboard as DashboardIcon,
  Slideshow as PresentationsIcon,
  People as TeamIcon, 
  Settings as SettingsIcon,
  Add,
  ChevronRight,
  Folder,
  StarOutline,
  AccessTime,
  Search,
  Upgrade,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { toggleDarkMode } from '../../store/slices/uiSlice';

const SidebarContainer = styled.div`
  width: 260px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => `rgba(59, 130, 246, 0.1)`};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(10px);
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: ${({ theme }) => theme.colors.gradient.primary};
    opacity: 0.1;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const SidebarTitle = styled.h4`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 1.2px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.gradient.primary};
    margin-left: ${({ theme }) => theme.spacing.sm};
    opacity: 0.2;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  transition: all 0.2s ease;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  &:hover, &.active {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  &.active {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: 8px;
  margin: 0 16px 24px 16px;
  
  svg {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-right: 8px;
  }
  
  input {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    width: 100%;
    outline: none;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const UpgradeButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0 16px 24px 16px;
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.secondary}`};
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  
  svg {
    color: ${({ theme, $isDark }) => $isDark ? '#ffc107' : theme.colors.primary};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  
  return (
    <SidebarContainer>
      <UpgradeButton>
        <Upgrade fontSize="small" />
        Upgrade this workspace
      </UpgradeButton>
      
      <SearchBox>
        <Search fontSize="small" />
        <input placeholder="Search & commands" />
      </SearchBox>
      
      <SidebarSection>
        <SidebarTitle>Navigation</SidebarTitle>
        <NavItem to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <DashboardIcon />
          Recents
        </NavItem>
        <NavItem to="/presentations" className={({ isActive }) => isActive ? 'active' : ''}>
          <PresentationsIcon />
          Manage library
        </NavItem>
        <NavItem to="/links" className={({ isActive }) => isActive ? 'active' : ''}>
          <ChevronRight />
          Links overview
        </NavItem>
      </SidebarSection>
      
      <SidebarSection>
        <SidebarTitle>Workspaces</SidebarTitle>
        <NavItem to="/team" className={({ isActive }) => isActive ? 'active' : ''}>
          <TeamIcon />
          Team
        </NavItem>
        <NavItem to="/private" className={({ isActive }) => isActive ? 'active' : ''}>
          <Folder />
          Private
        </NavItem>
        <ActionButton>
          <Add />
          Create folder
        </ActionButton>
      </SidebarSection>
      
      <ThemeToggle onClick={() => dispatch(toggleDarkMode())} $isDark={darkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
        {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
      </ThemeToggle>
    </SidebarContainer>
  );
};

export default Sidebar;
