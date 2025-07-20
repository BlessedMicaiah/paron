import React, { useState } from 'react';
import styled from 'styled-components';
import { Delete, ContentCopy, DragIndicator, MoreVert } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const PreviewContainer = styled(motion.div)`
  position: relative;
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.gradient.surface : theme.colors.surface
  };
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  border: 2px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.borderLight
  };
  box-shadow: ${({ theme, $isActive }) => 
    $isActive ? theme.shadows.primary : theme.shadows.sm
  };
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
    
    .slide-actions {
      opacity: 1;
      transform: translateY(0);
    }
    
    .drag-handle {
      opacity: 1;
    }
  }
`;

const DragHandle = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  opacity: 0;
  transition: ${({ theme }) => theme.transition.fast};
  cursor: grab;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  &:active {
    cursor: grabbing;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SlideNumber = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  backdrop-filter: blur(4px);
`;

const SlideTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing[2]} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme, background }) => background || theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  // Scale down the content to fit in the preview
  .slide-content {
    transform: scale(0.2);
    transform-origin: top left;
    width: 500%;
    height: 500%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    font-family: ${({ theme }) => theme.fonts.body};
  }
`;

const SlideActions = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  opacity: 0;
  transform: translateY(10px);
  transition: ${({ theme }) => theme.transition.normal};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  backdrop-filter: blur(10px);
  color: ${({ theme, $danger }) => $danger ? theme.colors.error : theme.colors.text};
  
  &:hover {
    background: ${({ theme, $danger }) => 
      $danger ? theme.colors.errorLight : theme.colors.white
    };
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ActionMenu = styled.div`
  position: relative;
`;

const ActionMenuDropdown = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  min-width: 120px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ActionMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: none;
  background: none;
  color: ${({ theme, $danger }) => $danger ? theme.colors.error : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme, $danger }) => 
      $danger ? theme.colors.errorLight : theme.colors.surfaceHover
    };
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const SlidePreview = ({ slide, isActive, onClick, onDelete, onDuplicate, onDragStart, onDragEnd }) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
    setShowActionMenu(false);
  };
  
  const handleDuplicate = (e) => {
    e.stopPropagation();
    onDuplicate();
    setShowActionMenu(false);
  };
  
  const handleDragStart = (e) => {
    onDragStart?.(slide.id);
  };
  
  const handleDragEnd = (e) => {
    onDragEnd?.();
  };
  
  const toggleActionMenu = (e) => {
    e.stopPropagation();
    setShowActionMenu(!showActionMenu);
  };
  
  return (
    <PreviewContainer 
      $isActive={isActive} 
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <DragHandle className="drag-handle">
        <DragIndicator />
      </DragHandle>
      
      <ThumbnailContainer background={slide.background}>
        <div className="slide-content" dangerouslySetInnerHTML={{ __html: slide.content }} />
        <SlideNumber>{slide.id}</SlideNumber>
        
        <SlideActions className="slide-actions">
          <ActionButton onClick={handleDuplicate} title="Duplicate slide">
            <ContentCopy />
          </ActionButton>
          <ActionButton onClick={handleDelete} title="Delete slide" $danger>
            <Delete />
          </ActionButton>
          
          <ActionMenu>
            <ActionButton onClick={toggleActionMenu} title="More options">
              <MoreVert />
            </ActionButton>
            
            <AnimatePresence>
              {showActionMenu && (
                <ActionMenuDropdown
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <ActionMenuItem onClick={handleDuplicate}>
                    <ContentCopy />
                    Duplicate
                  </ActionMenuItem>
                  <ActionMenuItem onClick={handleDelete} $danger>
                    <Delete />
                    Delete
                  </ActionMenuItem>
                </ActionMenuDropdown>
              )}
            </AnimatePresence>
          </ActionMenu>
        </SlideActions>
      </ThumbnailContainer>
      
      <SlideTitle>{slide.title}</SlideTitle>
    </PreviewContainer>
  );
};

export default SlidePreview;
