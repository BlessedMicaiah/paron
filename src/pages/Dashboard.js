import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Add } from '@mui/icons-material';
import PresentationCard from '../components/dashboard/PresentationCard';
import SearchBar from '../components/dashboard/SearchBar';
import FilterBar from '../components/dashboard/FilterBar';
import { Button } from '../components/common';
import { addPresentation } from '../store/slices/presentationsSlice';
import { setFilterBy, setCurrentView, setSortBy } from '../store/slices/uiSlice';

// --- Modern Styled Components ---
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
`;

const DashboardContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
  
  ${({ theme }) => theme.media.maxTablet} {
    padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[3]};
  }
`;

const WelcomeSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[10]};
  text-align: center;
  
  ${({ theme }) => theme.media.maxTablet} {
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
`;

const WelcomeTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  
  ${({ theme }) => theme.media.maxTablet} {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  ${({ theme }) => theme.media.maxTablet} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

const QuickActions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  
  ${({ theme }) => theme.media.maxTablet} {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const ActionCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  min-width: 200px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    width: 100%;
    max-width: 300px;
  }
`;

const ActionIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gradient.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ActionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ActionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const ContentSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.gradient.surface};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  
  ${({ theme }) => theme.media.maxTablet} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  
  ${({ theme }) => theme.media.maxTablet} {
    max-width: none;
  }
`;

const CardsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $view }) => 
    $view === 'grid' 
      ? 'repeat(auto-fill, minmax(350px, 1fr))' 
      : '1fr'
  };
  gap: ${({ theme }) => theme.spacing[6]};
  
  ${({ theme }) => theme.media.maxTablet} {
    grid-template-columns: ${({ $view }) => 
      $view === 'grid' 
        ? 'repeat(auto-fill, minmax(300px, 1fr))' 
        : '1fr'
    };
    gap: ${({ theme }) => theme.spacing[4]};
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textSecondary};
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    font-weight: 600;
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
`;

// --- Main Dashboard Component ---
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Local state for search and enhanced functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // Redux state
  const presentations = useSelector((state) => state.presentations.items);
  const { filterBy, currentView, sortBy } = useSelector((state) => state.ui);
  
  // Filter and search presentations
  const filtered = useMemo(() => {
    let result = presentations;
    
    // Apply filter
    if (filterBy === 'me') {
      result = result.filter(p => p.owner === 'You');
    } else if (filterBy === 'starred') {
      result = result.filter(p => p.isStarred);
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.owner.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting - create a copy to avoid mutating the original array
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.lastEdited) - new Date(a.lastEdited);
        case 'slides':
          return (typeof b.slides === 'number' ? b.slides : b.slides.length) - 
                 (typeof a.slides === 'number' ? a.slides : a.slides.length);
        case 'recent':
        default:
          return new Date(b.lastEdited) - new Date(a.lastEdited);
      }
    });
    
    return result;
  }, [presentations, filterBy, searchQuery, sortBy]);

  // Handle creating a new presentation
  const handleCreateNew = useCallback(() => {
    const newId = Date.now();
    dispatch(addPresentation({
      id: newId,
      title: 'Untitled Presentation',
      thumbnail: 'https://via.placeholder.com/300x200/586EE0/FFFFFF?text=New+Presentation',
      lastEdited: new Date().toLocaleString(),
      owner: 'You',
      slides: 1,
      isPrivate: true
    }));
    navigate(`/editor/${newId}`);
  }, [dispatch, navigate]);

  // Generate search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const suggestions = [];
    const query = searchQuery.toLowerCase();
    
    // Add title suggestions
    presentations.forEach(p => {
      if (p.title.toLowerCase().includes(query) && !suggestions.find(s => s.text === p.title)) {
        suggestions.push({ text: p.title, type: 'title' });
      }
    });
    
    // Add owner suggestions
    const owners = [...new Set(presentations.map(p => p.owner))];
    owners.forEach(owner => {
      if (owner.toLowerCase().includes(query) && !suggestions.find(s => s.text === owner)) {
        suggestions.push({ text: owner, type: 'owner' });
      }
    });
    
    return suggestions.slice(0, 5);
  }, [searchQuery, presentations]);

  // Callback handlers for PresentationCard
  const handleEdit = useCallback((id) => navigate(`/editor/${id}`), [navigate]);
  
  const handleDuplicate = useCallback((id) => {
    const original = presentations.find(p => p.id === id);
    if (original) {
      const newId = Date.now();
      dispatch(addPresentation({
        ...original,
        id: newId,
        title: `${original.title} (Copy)`,
        lastEdited: new Date().toLocaleString()
      }));
    }
  }, [presentations, dispatch]);
  
  const handleDelete = useCallback((id) => {
    // TODO: Implement delete with confirmation dialog
    console.log('Delete presentation:', id);
  }, []);
  
  const handleShare = useCallback((id) => {
    // TODO: Implement share functionality
    console.log('Share presentation:', id);
  }, []);
  
  const handleToggleStar = useCallback((id, starred) => {
    // TODO: Implement star toggle
    console.log('Toggle star:', id, starred);
  }, []);

  return (
    <DashboardContainer>
      <DashboardContent>
        <WelcomeSection>
          <WelcomeTitle>Create Amazing Presentations</WelcomeTitle>
          <WelcomeSubtitle>
            Design beautiful, professional presentations with our modern tools and templates
          </WelcomeSubtitle>
          
          <QuickActions>
            <ActionCard onClick={handleCreateNew}>
              <ActionIcon>
                <Add />
              </ActionIcon>
              <ActionTitle>New Presentation</ActionTitle>
              <ActionDescription>Start from scratch with a blank presentation</ActionDescription>
            </ActionCard>
            
            <ActionCard>
              <ActionIcon>
                <Add />
              </ActionIcon>
              <ActionTitle>Use Template</ActionTitle>
              <ActionDescription>Choose from our collection of templates</ActionDescription>
            </ActionCard>
            
            <ActionCard>
              <ActionIcon>
                <Add />
              </ActionIcon>
              <ActionTitle>Import File</ActionTitle>
              <ActionDescription>Upload an existing presentation</ActionDescription>
            </ActionCard>
          </QuickActions>
        </WelcomeSection>

        <ContentSection>
          <SectionHeader>
            <SectionTitle>Recent Presentations</SectionTitle>
            <SectionSubtitle>Pick up where you left off</SectionSubtitle>
          </SectionHeader>
          
          <ControlsBar>
            <SearchContainer>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                suggestions={searchSuggestions}
                showSuggestions={true}
                placeholder="Search presentations..."
              />
            </SearchContainer>
            
            <FilterBar
              filterBy={filterBy}
              sortBy={sortBy}
              currentView={currentView}
              onFilterChange={(filter) => dispatch(setFilterBy(filter))}
              onSortChange={(sort) => dispatch(setSortBy(sort))}
              onViewChange={(view) => dispatch(setCurrentView(view))}
            />
          </ControlsBar>
          
          <CardsContainer>
            <CardsGrid $view={currentView}>
              {filtered.length === 0 ? (
                <EmptyState>
                  <h3>No presentations found</h3>
                  <p>
                    {searchQuery.trim() 
                      ? `No presentations match "${searchQuery}". Try adjusting your search or filters.`
                      : 'Create your first presentation to get started.'
                    }
                  </p>
                  {!searchQuery.trim() && (
                    <Button 
                      variant="primary" 
                      startIcon={<Add />}
                      onClick={handleCreateNew}
                    >
                      Create presentation
                    </Button>
                  )}
                </EmptyState>
              ) : (
                filtered.map(p => (
                  <PresentationCard 
                    key={p.id} 
                    presentation={p} 
                    view={currentView}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                    onShare={handleShare}
                    onToggleStar={handleToggleStar}
                  />
                ))
              )}
            </CardsGrid>
          </CardsContainer>
        </ContentSection>
      </DashboardContent>
    </DashboardContainer>
  );
}

export default Dashboard;
