import React from 'react';
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
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.lg};
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

const SectionTitle = styled.h2`
  margin: ${theme.spacing.xl} 0 ${theme.spacing.md};
  font-size: ${theme.fontSizes.xl};
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
  
  h3 {
    margin: ${theme.spacing.md} 0;
  }
  
  p {
    color: ${theme.colors.darkGray};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const Dashboard = () => {
  const { presentations, addPresentation } = usePresentations();
  const navigate = useNavigate();
  
  const recentPresentations = presentations
    .filter(p => p.owner === 'You')
    .sort((a, b) => a.lastEdited < b.lastEdited ? 1 : -1)
    .slice(0, 4);
    
  const teamPresentations = presentations
    .filter(p => p.owner !== 'You')
    .sort((a, b) => a.lastEdited < b.lastEdited ? 1 : -1)
    .slice(0, 4);
    
  const handleCreateNew = () => {
    const newId = addPresentation({
      title: 'Untitled Presentation',
      thumbnail: `https://via.placeholder.com/300x200/${theme.colors.primary.replace('#', '')}/FFFFFF?text=New+Presentation`,
    });
    navigate(`/editor/${newId}`);
  };
  
  return (
    <div>
      <PageHeader>
        <div>
          <Title>Welcome to Paron</Title>
          <Subtitle>Create beautiful presentations that stand out</Subtitle>
        </div>
        <CreateButton onClick={handleCreateNew}>
          <Add />
          New Presentation
        </CreateButton>
      </PageHeader>

      <SectionTitle>Recent Presentations</SectionTitle>
      {recentPresentations.length > 0 ? (
        <Grid container spacing={3}>
          {recentPresentations.map(presentation => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={presentation.id}>
              <PresentationCard presentation={presentation} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <h3>No presentations yet</h3>
          <p>Create your first presentation to get started</p>
          <CreateButton onClick={handleCreateNew}>
            <Add />
            Create Presentation
          </CreateButton>
        </EmptyState>
      )}

      {teamPresentations.length > 0 && (
        <>
          <SectionTitle>Team Presentations</SectionTitle>
          <Grid container spacing={3}>
            {teamPresentations.map(presentation => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={presentation.id}>
                <PresentationCard presentation={presentation} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Dashboard;
