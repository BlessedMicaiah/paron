import React from 'react';
import styled from 'styled-components';
import { MoreVert, Slideshow, CalendarToday, Person, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transition.normal};
  cursor: pointer;
  border: 1px solid ${({ theme }) => `rgba(59, 130, 246, 0.05)`};
  position: relative;
  display: flex;
  flex-direction: ${({ $view }) => $view === 'list' ? 'row' : 'column'};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
    
    &::after {
      opacity: 1;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 5%;
    width: 90%;
    height: 6px;
    background: ${({ theme }) => theme.colors.gradient.primary};
    border-radius: 0 0 ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const Thumbnail = styled.div`
  position: relative;
  height: ${({ $view }) => $view === 'list' ? '100px' : '160px'};
  width: ${({ $view }) => $view === 'list' ? '160px' : 'auto'};
  background-color: ${({ theme }) => theme.colors.gray};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2) 100%);
    z-index: 1;
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CardActions = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  svg {
    font-size: 16px;
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const PrivateBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const PresentationCard = ({ presentation, view = 'grid' }) => {
  const navigate = useNavigate();
  const { id, title, thumbnail, lastEdited, owner, slides, isPrivate } = presentation;
  
  const handleClick = () => {
    navigate(`/editor/${id}`);
  };
  
  return (
    <Card onClick={handleClick} $view={view}>
      <Thumbnail src={thumbnail} $view={view}>
        {isPrivate && (
          <PrivateBadge>
            <Lock fontSize="small" />
          </PrivateBadge>
        )}
      </Thumbnail>
      <CardContent>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardActions>
            <MoreVert />
          </CardActions>
        </CardHeader>
        <CardMeta>
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

export default PresentationCard;
