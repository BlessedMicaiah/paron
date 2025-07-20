import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Add } from '@mui/icons-material';
import theme from '../styles/theme';
import PresentationCard from '../components/dashboard/PresentationCard';
import { addPresentation } from '../store/slices/presentationsSlice';

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: bold;
  cursor: pointer;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterButton = styled.button`
  background-color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.$active ? props.theme.colors.white : props.theme.colors.text};
  border: 1px solid ${props => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.surfaceHover};
  }
`;

const SortSelect = styled.select`
  margin-left: auto;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Presentations = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('lastEdited');
  const presentations = useSelector(state => state.presentations.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleCreateNew = () => {
    const newId = Date.now();
    dispatch(addPresentation({
      id: newId,
      title: 'Untitled Presentation',
      thumbnail: `https://via.placeholder.com/300x200/D4AF37/FFFFFF?text=New+Presentation`,
      lastEdited: new Date().toLocaleString(),
      owner: 'You',
      slides: 1,
      isPrivate: true
    }));
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
          $active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'recent'} 
          onClick={() => setActiveFilter('recent')}
        >
          My Presentations
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'shared'} 
          onClick={() => setActiveFilter('shared')}
        >
          Shared with Me
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
