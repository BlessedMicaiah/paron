import React, { useState, memo } from 'react';
import styled, { css } from 'styled-components';
import { 
  MoreVert, 
  Slideshow, 
  CalendarToday, 
  Person, 
  Lock,
  Edit,
  ContentCopy,
  Delete,
  Share,
  Star,
  StarBorder
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  display: flex;
  flex-direction: ${({ $view }) => $view === 'list' ? 'row' : 'column'};
  transition: ${({ theme }) => theme.transition.normal};
  cursor: pointer;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    
    .card-overlay {
      opacity: 1;
    }
    
    .card-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  ${({ theme }) => theme.media.maxTablet} {
    flex-direction: column;
  }
`;

const Thumbnail = styled.div`
  position: relative;
  height: ${({ $view }) => $view === 'list' ? '120px' : '180px'};
  width: ${({ $view }) => $view === 'list' ? '200px' : 'auto'};
  background: ${({ theme }) => theme.colors.gradient.background};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0.1) 100%);
    z-index: 1;
    transition: ${({ theme }) => theme.transition.normal};
  }
  
  &:hover::before {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(0,0,0,0.05) 100%);
  }
  
  ${({ theme }) => theme.media.maxTablet} {
    height: 140px;
    width: auto;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${({ theme }) => theme.transition.normal};
  z-index: 3;
  backdrop-filter: blur(2px);
`;

const QuickActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  opacity: 0;
  transform: translateY(10px);
  transition: ${({ theme }) => theme.transition.normal};
`;

const QuickActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${({ theme }) => theme.colors.white};
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const CardContent = styled.div`
  padding: ${({ theme, $view }) => $view === 'list' ? theme.spacing[4] : theme.spacing[5]};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme, $view }) => $view === 'list' ? theme.fontSizes.md : theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionMenu = styled.div`
  position: relative;
`;

const ActionMenuButton = styled.button`
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
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ActionMenuDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  min-width: 160px;
  overflow: hidden;
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
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme, $danger }) => 
      $danger ? theme.colors.errorLight : theme.colors.surfaceHover
    };
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: ${({ $view }) => $view === 'list' ? 'row' : 'column'};
  gap: ${({ theme, $view }) => $view === 'list' ? theme.spacing[4] : theme.spacing[2]};
  margin-top: auto;
  
  ${({ theme }) => theme.media.maxTablet} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: ${({ theme }) => theme.spacing[1]};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StatusBadges = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[3]};
  right: ${({ theme }) => theme.spacing[3]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  z-index: 2;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(0, 0, 0, 0.7);
  color: white;
  backdrop-filter: blur(10px);
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const StarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme, $starred }) => $starred ? theme.colors.warning : theme.colors.textSecondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.warning};
    transform: scale(1.1);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const PresentationCard = ({ 
  presentation, 
  view = 'grid',
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
  onToggleStar
}) => {
  const navigate = useNavigate();
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [isStarred, setIsStarred] = useState(presentation.isStarred || false);
  
  const { id, title, thumbnail, lastEdited, owner, slides, isPrivate } = presentation;
  
  const handleCardClick = (e) => {
    // Don't navigate if clicking on action buttons
    if (e.target.closest('button') || e.target.closest('.action-menu')) {
      return;
    }
    navigate(`/editor/${id}`);
  };
  
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/editor/${id}`);
    onEdit?.(id);
  };
  
  const handleDuplicate = (e) => {
    e.stopPropagation();
    onDuplicate?.(id);
    setShowActionMenu(false);
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(id);
    setShowActionMenu(false);
  };
  
  const handleShare = (e) => {
    e.stopPropagation();
    onShare?.(id);
    setShowActionMenu(false);
  };
  
  const handleToggleStar = (e) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
    onToggleStar?.(id, !isStarred);
  };
  
  const toggleActionMenu = (e) => {
    e.stopPropagation();
    setShowActionMenu(!showActionMenu);
  };

  return (
    <Card
      $view={view}
      onClick={handleCardClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Thumbnail src={thumbnail} $view={view}>
        <CardOverlay className="card-overlay">
          <QuickActions className="card-actions">
            <QuickActionButton onClick={handleEdit} title="Edit">
              <Edit />
            </QuickActionButton>
            <QuickActionButton onClick={handleDuplicate} title="Duplicate">
              <ContentCopy />
            </QuickActionButton>
            <QuickActionButton onClick={handleShare} title="Share">
              <Share />
            </QuickActionButton>
          </QuickActions>
        </CardOverlay>
        
        <StatusBadges>
          <StarButton 
            $starred={isStarred} 
            onClick={handleToggleStar}
            title={isStarred ? "Remove from favorites" : "Add to favorites"}
          >
            {isStarred ? <Star /> : <StarBorder />}
          </StarButton>
          {isPrivate && (
            <Badge title="Private presentation">
              <Lock />
            </Badge>
          )}
        </StatusBadges>
      </Thumbnail>
      
      <CardContent $view={view}>
        <CardHeader>
          <CardTitle $view={view} onClick={handleCardClick}>
            {title}
          </CardTitle>
          
          <ActionMenu className="action-menu">
            <ActionMenuButton onClick={toggleActionMenu}>
              <MoreVert />
            </ActionMenuButton>
            
            <AnimatePresence>
              {showActionMenu && (
                <ActionMenuDropdown
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <ActionMenuItem onClick={handleEdit}>
                    <Edit />
                    Edit
                  </ActionMenuItem>
                  <ActionMenuItem onClick={handleDuplicate}>
                    <ContentCopy />
                    Duplicate
                  </ActionMenuItem>
                  <ActionMenuItem onClick={handleShare}>
                    <Share />
                    Share
                  </ActionMenuItem>
                  <ActionMenuItem onClick={handleDelete} $danger>
                    <Delete />
                    Delete
                  </ActionMenuItem>
                </ActionMenuDropdown>
              )}
            </AnimatePresence>
          </ActionMenu>
        </CardHeader>
        
        <CardMeta $view={view}>
          <MetaItem>
            <CalendarToday />
            {lastEdited}
          </MetaItem>
          <MetaItem>
            <Person />
            {owner}
          </MetaItem>
          <MetaItem>
            <Slideshow />
            {typeof slides === 'number' ? `${slides} slides` : `${slides.length} slides`}
          </MetaItem>
        </CardMeta>
      </CardContent>
    </Card>
  );
};

export default memo(PresentationCard);
