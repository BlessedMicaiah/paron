import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import theme from '../styles/theme';
import PresentationCard from '../components/dashboard/PresentationCard';
import { usePresentations } from '../context/PresentationContext';

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.md};
  font-weight: bold;
  cursor: pointer;
  
  svg {
    margin-right: ${theme.spacing.xs};
  }

  &:hover {
    background-color: #4A5BC3;
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray};
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.active ? theme.colors.white : theme.colors.text};
  border: 1px solid ${props => props.active ? theme.colors.primary : theme.colors.gray};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  margin-right: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: ${theme.transition.fast};
  
  &:hover {
    background-color: ${props => props.active ? theme.colors.primary : theme.colors.secondary};
  }
`;

const SortSelect = styled.select`
  margin-left: auto;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray};
  font-size: ${theme.fontSizes.sm};
  background-color: ${theme.colors.white};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  text-align: center;
  margin-top: ${theme.spacing.xl};
  
  h3 {
    margin: ${theme.spacing.md} 0;
  }
  
  p {
    color: ${theme.colors.darkGray};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const Presentations = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('lastEdited');
  const { presentations, addPresentation } = usePresentations();
  const navigate = useNavigate();
  
  const handleCreateNew = () => {
    const newId = addPresentation({
      title: 'Untitled Presentation',
      thumbnail: `https://via.placeholder.com/300x200/${theme.colors.primary.replace('#', '')}/FFFFFF?text=New+Presentation`,
    });
    navigate(`/editor/${newId}`);
  };
  
  // Filter presentations based on the active filter
  const filteredPresentations = presentations.filter(presentation => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'recent' && presentation.owner === 'You') return true;
    if (activeFilter === 'shared' && presentation.owner !== 'You') return true;
    return false;
  });
  
  // Sort presentations based on the sort order
  const sortedPresentations = [...filteredPresentations].sort((a, b) => {
    if (sortOrder === 'lastEdited') {
      // Sort by last edited, most recent first
      return a.lastEdited < b.lastEdited ? 1 : -1;
    } else if (sortOrder === 'nameAsc') {
      // Sort by name, A-Z
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'nameDesc') {
      // Sort by name, Z-A
      return b.title.localeCompare(a.title);
    } else if (sortOrder === 'owner') {
      // Sort by owner, with "You" first
      if (a.owner === 'You' && b.owner !== 'You') return -1;
      if (a.owner !== 'You' && b.owner === 'You') return 1;
      return a.owner.localeCompare(b.owner);
    }
    return 0;
  });
  
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  
  return (
    <div>
      <PageHeader>
        <Title>Presentations</Title>
        <CreateButton onClick={handleCreateNew}>
          <Add />
          New Presentation
        </CreateButton>
      </PageHeader>
      
      <FilterBar>
        <FilterButton 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'recent'} 
          onClick={() => setActiveFilter('recent')}
        >
          Created by me
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'shared'} 
          onClick={() => setActiveFilter('shared')}
        >
          Shared with me
        </FilterButton>
        
        <SortSelect value={sortOrder} onChange={handleSortChange}>
          <option value="lastEdited">Last edited</option>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="owner">Created by me</option>
        </SortSelect>
      </FilterBar>
      
      {sortedPresentations.length > 0 ? (
        <Grid container spacing={3}>
          {sortedPresentations.map(presentation => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={presentation.id}>
              <PresentationCard presentation={presentation} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <h3>No presentations found</h3>
          <p>Create a new presentation or adjust your filters</p>
          <CreateButton onClick={handleCreateNew}>
            <Add />
            Create Presentation
          </CreateButton>
        </EmptyState>
      )}
    </div>
  );
};

export default Presentations;
