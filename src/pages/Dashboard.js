import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Add, FilterList, ViewModule, ViewList } from '@mui/icons-material';
import PresentationCard from '../components/dashboard/PresentationCard';
import { addPresentation } from '../store/slices/presentationsSlice';
import { setFilterBy, setCurrentView } from '../store/slices/uiSlice';

// --- Styled Components ---
const RecentsHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
  transition: box-shadow 0.2s;
  gap: 8px;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.09);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const FilterButton = styled.button`
  background: ${({ theme, $active }) => $active ? theme.colors.surfaceHover : theme.colors.surface};
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active, theme }) => $active ? theme.colors.surfaceHover : 'transparent'};
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $view }) => $view === 'grid' ? 'repeat(auto-fill, minmax(340px, 1fr))' : '1fr'};
  gap: ${({ $view }) => $view === 'grid' ? '32px 24px' : '16px'};
`;

// --- Main Dashboard Component ---
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const presentations = useSelector((state) => state.presentations.items);
  const { filterBy, currentView } = useSelector((state) => state.ui);
  
  // Filter presentations based on current filter
  const filtered = presentations.filter(p => filterBy === 'me' ? p.owner === 'You' : true);

  // Handle creating a new presentation
  const handleCreateNew = () => {
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
  };

  return (
    <div style={{ padding: '40px 48px 0 48px', background: 'var(--background-color, #fafbfc)', minHeight: '100vh' }}>
      <RecentsHeader>
        <h2 style={{ fontWeight: 700, fontSize: 32, margin: 0 }}>Recents</h2>
        <Actions>
          <ActionButton onClick={handleCreateNew}>
            <Add fontSize="small" />
            <span style={{ fontWeight: 600 }}>Start new presentation</span>
          </ActionButton>
          <ActionButton>
            <span>Create new room</span>
          </ActionButton>
          <ActionButton>
            <span>Import presentation</span>
          </ActionButton>
        </Actions>
      </RecentsHeader>
      
      <FilterBar>
        <FilterGroup>
          <FilterButton 
            $active={filterBy === 'me'} 
            onClick={() => dispatch(setFilterBy('me'))}
          >
            By me
          </FilterButton>
          <FilterButton 
            $active={filterBy === 'everyone'} 
            onClick={() => dispatch(setFilterBy('everyone'))}
          >
            By everyone
          </FilterButton>
        </FilterGroup>
        
        <ViewToggle>
          <IconButton 
            $active={currentView === 'grid'} 
            onClick={() => dispatch(setCurrentView('grid'))}
          >
            <ViewModule fontSize="small" />
          </IconButton>
          <IconButton 
            $active={currentView === 'list'} 
            onClick={() => dispatch(setCurrentView('list'))}
          >
            <ViewList fontSize="small" />
          </IconButton>
        </ViewToggle>
      </FilterBar>
      
      <CardsGrid $view={currentView}>
        {filtered.length === 0 ? (
          <div style={{ color: '#888', fontSize: 18, gridColumn: '1/-1', textAlign: 'center', marginTop: 80 }}>
            No presentations found.
          </div>
        ) : (
          filtered.map(p => (
            <PresentationCard key={p.id} presentation={p} view={currentView} />
          ))
        )}
      </CardsGrid>
    </div>
  );
}

export default Dashboard;
