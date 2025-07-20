import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { 
  FilterList, 
  ViewModule, 
  ViewList, 
  Sort,
  Person,
  Group,
  Star,
  Schedule,
  ExpandMore
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  ${({ theme }) => theme.media.maxTablet} {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  
  ${({ theme }) => theme.media.maxTablet} {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.surface
  };
  color: ${({ theme, $active }) => 
    $active ? theme.colors.white : theme.colors.text
  };
  border: 1px solid ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  
  &:hover {
    background: ${({ theme, $active }) => 
      $active ? theme.colors.primaryHover : theme.colors.surfaceHover
    };
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 16px;
    height: 16px;
    
    &.expand-icon {
      transition: ${({ theme }) => theme.transition.fast};
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  min-width: 160px;
  margin-top: ${({ theme }) => theme.spacing[1]};
  overflow: hidden;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: none;
  background: ${({ theme, $active }) => 
    $active ? theme.colors.surfaceHover : 'none'
  };
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  text-align: left;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[1]};
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: ${({ theme, $active }) => 
    $active ? theme.colors.primary : 'transparent'
  };
  color: ${({ theme, $active }) => 
    $active ? theme.colors.white : theme.colors.textSecondary
  };
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme, $active }) => 
      $active ? theme.colors.primaryHover : theme.colors.surfaceHover
    };
    color: ${({ theme, $active }) => 
      $active ? theme.colors.white : theme.colors.primary
    };
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const FilterBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const FilterBar = ({
  filterBy = 'all',
  sortBy = 'recent',
  currentView = 'grid',
  onFilterChange,
  onSortChange,
  onViewChange,
  activeFiltersCount = 0,
  className,
  ...props
}) => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filterOptions = [
    { key: 'all', label: 'All', icon: <Group /> },
    { key: 'me', label: 'By me', icon: <Person /> },
    { key: 'starred', label: 'Starred', icon: <Star /> },
    { key: 'recent', label: 'Recent', icon: <Schedule /> },
  ];

  const sortOptions = [
    { key: 'recent', label: 'Recently modified', icon: <Schedule /> },
    { key: 'name', label: 'Name A-Z', icon: <Sort /> },
    { key: 'created', label: 'Date created', icon: <Schedule /> },
    { key: 'slides', label: 'Number of slides', icon: <ViewModule /> },
  ];

  const handleFilterClick = (filterKey) => {
    onFilterChange?.(filterKey);
  };

  const handleSortClick = (sortKey) => {
    onSortChange?.(sortKey);
    setSortDropdownOpen(false);
  };

  const handleViewClick = (view) => {
    onViewChange?.(view);
  };

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find(option => option.key === sortBy);
    return currentSort ? currentSort.label : 'Sort';
  };

  return (
    <FilterContainer className={className} {...props}>
      <FilterGroup>
        {filterOptions.map((option) => (
          <FilterButton
            key={option.key}
            $active={filterBy === option.key}
            onClick={() => handleFilterClick(option.key)}
          >
            {option.icon}
            {option.label}
          </FilterButton>
        ))}
        
        {activeFiltersCount > 0 && (
          <FilterButton $active>
            <FilterList />
            Filters
            <FilterBadge>{activeFiltersCount}</FilterBadge>
          </FilterButton>
        )}
      </FilterGroup>

      <FilterGroup>
        <div style={{ position: 'relative' }}>
          <DropdownButton
            $isOpen={sortDropdownOpen}
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
          >
            <Sort />
            {getCurrentSortLabel()}
            <ExpandMore className="expand-icon" />
          </DropdownButton>

          <AnimatePresence>
            {sortDropdownOpen && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {sortOptions.map((option) => (
                  <DropdownItem
                    key={option.key}
                    $active={sortBy === option.key}
                    onClick={() => handleSortClick(option.key)}
                  >
                    {option.icon}
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </AnimatePresence>
        </div>

        <ViewToggle>
          <ViewButton
            $active={currentView === 'grid'}
            onClick={() => handleViewClick('grid')}
            title="Grid view"
          >
            <ViewModule />
          </ViewButton>
          <ViewButton
            $active={currentView === 'list'}
            onClick={() => handleViewClick('list')}
            title="List view"
          >
            <ViewList />
          </ViewButton>
        </ViewToggle>
      </FilterGroup>
    </FilterContainer>
  );
};

export default FilterBar;