import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon,
  Slideshow as PresentationsIcon,
  People as TeamIcon, 
  Settings as SettingsIcon,
  Add
} from '@mui/icons-material';
import theme from '../../styles/theme';
import { usePresentations } from '../../context/PresentationContext';

const SidebarContainer = styled.div`
  width: 240px;
  height: 100%;
  background-color: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray};
  padding: ${theme.spacing.md} 0;
  display: flex;
  flex-direction: column;
`;

const SidebarSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
  padding: 0 ${theme.spacing.md};
`;

const SidebarTitle = styled.h4`
  text-transform: uppercase;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.xs};
  margin-bottom: ${theme.spacing.sm};
  padding: 0 ${theme.spacing.md};
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: ${theme.spacing.xs};
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  text-decoration: none;
  color: ${theme.colors.text};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transition.fast};
  
  &:hover {
    background-color: ${theme.colors.secondary};
  }
  
  &.active {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.primary};
    font-weight: bold;
  }
  
  svg {
    margin-right: ${theme.spacing.sm};
    font-size: ${theme.fontSizes.lg};
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - ${theme.spacing.lg});
  margin: 0 ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.md};
  cursor: pointer;
  
  svg {
    margin-right: ${theme.spacing.xs};
  }
  
  &:hover {
    background-color: #4A5BC3;
  }
`;

const Sidebar = () => {
  const { addPresentation } = usePresentations();
  const navigate = useNavigate();
  
  const handleCreateNew = () => {
    const newId = addPresentation({
      title: 'Untitled Presentation',
      thumbnail: `https://via.placeholder.com/300x200/${theme.colors.primary.replace('#', '')}/FFFFFF?text=New+Presentation`,
    });
    navigate(`/editor/${newId}`);
  };
  
  return (
    <SidebarContainer>
      <SidebarSection>
        <CreateButton onClick={handleCreateNew}>
          <Add />
          New Presentation
        </CreateButton>
      </SidebarSection>
      
      <NavList>
        <NavItem>
          <StyledNavLink to="/dashboard">
            <DashboardIcon />
            Dashboard
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/presentations">
            <PresentationsIcon />
            Presentations
          </StyledNavLink>
        </NavItem>
      </NavList>
      
      <SidebarTitle>Workspace</SidebarTitle>
      <NavList>
        <NavItem>
          <StyledNavLink to="/team">
            <TeamIcon />
            Team
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/settings">
            <SettingsIcon />
            Settings
          </StyledNavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
