import React from 'react';
import styled from 'styled-components';
import { Delete, ContentCopy } from '@mui/icons-material';
import theme from '../../styles/theme';

const PreviewContainer = styled.div`
  position: relative;
  background-color: ${props => props.isactive ? theme.colors.secondary : theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs};
  cursor: pointer;
  transition: ${theme.transition.fast};
  border: 2px solid ${props => props.isactive ? theme.colors.primary : 'transparent'};
  
  &:hover {
    background-color: ${theme.colors.secondary};
    
    .slide-actions {
      opacity: 1;
    }
  }
`;

const SlideNumber = styled.span`
  position: absolute;
  top: ${theme.spacing.sm};
  left: ${theme.spacing.sm};
  background-color: ${theme.colors.darkGray}80;
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm};
  padding: 2px 6px;
  font-size: ${theme.fontSizes.xs};
  font-weight: bold;
`;

const SlideTitle = styled.div`
  font-size: ${theme.fontSizes.sm};
  padding: ${theme.spacing.xs} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background-color: ${props => props.background || theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
  
  // Scale down the content to fit in the preview
  .slide-content {
    transform: scale(0.25);
    transform-origin: top left;
    width: 400%;
    height: 400%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
`;

const SlideActions = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.sm};
  width: 24px;
  height: 24px;
  padding: 2px;
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.colors.secondary};
  }
  
  svg {
    font-size: 16px;
  }
`;

const SlidePreview = ({ slide, isActive, onClick, onDelete, onDuplicate }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };
  
  const handleDuplicate = (e) => {
    e.stopPropagation();
    onDuplicate();
  };
  
  return (
    <PreviewContainer isactive={isActive ? 'true' : 'false'} onClick={onClick}>
      <ThumbnailContainer background={slide.background}>
        <div className="slide-content" dangerouslySetInnerHTML={{ __html: slide.content }} />
        <SlideNumber>{slide.id}</SlideNumber>
        <SlideActions className="slide-actions">
          <ActionButton onClick={handleDuplicate} title="Duplicate slide">
            <ContentCopy />
          </ActionButton>
          <ActionButton onClick={handleDelete} title="Delete slide">
            <Delete />
          </ActionButton>
        </SlideActions>
      </ThumbnailContainer>
      <SlideTitle>{slide.title}</SlideTitle>
    </PreviewContainer>
  );
};

export default SlidePreview;
