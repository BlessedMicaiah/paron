import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon,
  Slideshow as PresentationsIcon,
  People as TeamIcon, 
  Settings as SettingsIcon,
  Add,
  ChevronRight,
  Folder,
  StarOutline,
  AccessTime
} from '@mui/icons-material';
import theme from '../../styles/theme';
import { usePresentations } from '../../context/PresentationContext';

const SidebarContainer = styled.div`
  width: 260px;
  height: 100%;
  background-color: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray};
  padding: ${theme.spacing.lg} 0;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: ${theme.colors.gray};
    box-shadow: 0 0 8px rgba(212, 175, 55, 0.2);
  }
`;

const SidebarSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding: 0 ${theme.spacing.md};
`;

const SidebarTitle = styled.h4`
  text-transform: uppercase;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.xs};
  letter-spacing: 1.2px;
  margin-bottom: ${theme.spacing.md};
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.colors.gray};
    margin-left: ${theme.spacing.sm};
    opacity: 0.6;
  }
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
  padding: ${theme.spacing.md} ${theme.spacing.md};
  text-decoration: none;
  color: ${theme.colors.text};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transition.normal};
  position: relative;
  overflow: hidden;
  
  svg {
    margin-right: ${theme.spacing.md};
    font-size: ${theme.fontSizes.xl};
    transition: ${theme.transition.normal};
    color: ${theme.colors.textSecondary};
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${theme.colors.primary};
    transform: translateX(-100%);
    transition: ${theme.transition.normal};
    opacity: 0;
  }
  
  &:hover {
    background-color: rgba(212, 175, 55, 0.05);
    color: ${theme.colors.primary};
    
    svg {
      color: ${theme.colors.primary};
      transform: scale(1.1);
    }
  }
  
  &.active {
    background-color: rgba(212, 175, 55, 0.1);
    color: ${theme.colors.primary};
    font-weight: 500;
    
    &:before {
      transform: translateX(0);
      opacity: 1;
      box-shadow: ${theme.shadows.gold};
    }
    
    svg {
      color: ${theme.colors.primary};
    }
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - ${theme.spacing.xl});
  margin: 0 ${theme.spacing.md} ${theme.spacing.xl};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gradient.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  cursor: pointer;
  transition: ${theme.transition.bounce};
  box-shadow: ${theme.shadows.md};
  
  svg {
    margin-right: ${theme.spacing.sm};
    transition: ${theme.transition.normal};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.gold};
    
    svg {
      transform: rotate(90deg);
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const CategoryTag = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textSecondary};
  
  svg {
    font-size: ${theme.fontSizes.md} !important;
    margin-right: 0 !important;
    margin-left: ${theme.spacing.xs};
  }
`;

const Sidebar = () => {
  const { addPresentation } = usePresentations();
  const navigate = useNavigate();
  const [categories] = useState(['Recent', 'Favorites', 'Shared']);
  
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
        <CreateButton onClick={handleCreateNew} className="pulse">
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
      
      <SidebarTitle>Libraries</SidebarTitle>
      <NavList>
        {categories.map((category, index) => (
          <NavItem key={index}>
            <StyledNavLink to={`/category/${category.toLowerCase()}`}>
              {category === 'Recent' ? (
                <AccessTime />
              ) : category === 'Favorites' ? (
                <StarOutline />
              ) : (
                <Folder />
              )}
              {category}
              <CategoryTag>
                {Math.floor(Math.random() * 10) + 1}
                <ChevronRight fontSize="small" />
              </CategoryTag>
            </StyledNavLink>
          </NavItem>
        ))}
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
