import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Search, Clear, FilterList } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $focused }) => 
    $focused ? theme.colors.primary : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: ${({ theme }) => theme.transition.fast};
  box-shadow: ${({ theme, $focused }) => 
    $focused ? theme.shadows.primary : theme.shadows.sm
  };
  
  &:hover:not(:focus-within) {
    border-color: ${({ theme }) => theme.colors.borderDark};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme, $focused }) => 
    $focused ? theme.colors.primary : theme.colors.textSecondary
  };
  transition: ${({ theme }) => theme.transition.fast};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing[2]};
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const SearchSuggestions = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  margin-top: ${({ theme }) => theme.spacing[1]};
  overflow: hidden;
`;

const SuggestionItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  text-align: left;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
  
  &:focus {
    background: ${({ theme }) => theme.colors.surfaceHover};
    outline: none;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SuggestionText = styled.span`
  flex: 1;
`;

const SuggestionType = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search presentations...',
  suggestions = [],
  showSuggestions = false,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    
    // Show suggestions if there's a value and suggestions are available
    if (newValue.trim() && suggestions.length > 0 && showSuggestions) {
      setShowSuggestionsList(true);
    } else {
      setShowSuggestionsList(false);
    }
  };

  const handleInputFocus = () => {
    setFocused(true);
    if (value.trim() && suggestions.length > 0 && showSuggestions) {
      setShowSuggestionsList(true);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(value);
      setShowSuggestionsList(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setShowSuggestionsList(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onChange?.('');
    setShowSuggestionsList(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    onChange?.(suggestion.text);
    onSearch?.(suggestion.text);
    setShowSuggestionsList(false);
    inputRef.current?.blur();
  };

  return (
    <SearchContainer ref={containerRef} className={className} {...props}>
      <SearchInputWrapper $focused={focused}>
        <SearchIcon $focused={focused}>
          <Search />
        </SearchIcon>
        
        <SearchInput
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
        />
        
        {value && (
          <ClearButton onClick={handleClear} title="Clear search">
            <Clear />
          </ClearButton>
        )}
      </SearchInputWrapper>

      <AnimatePresence>
        {showSuggestionsList && suggestions.length > 0 && (
          <SearchSuggestions
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search />
                <SuggestionText>{suggestion.text}</SuggestionText>
                {suggestion.type && (
                  <SuggestionType>{suggestion.type}</SuggestionType>
                )}
              </SuggestionItem>
            ))}
          </SearchSuggestions>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
};

export default SearchBar;