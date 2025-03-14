import React from 'react';
import styled from 'styled-components';
import { MoreVert, Slideshow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';

const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transition.fast};
  cursor: pointer;
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const Thumbnail = styled.div`
  position: relative;
  height: 160px;
  background-color: ${theme.colors.gray};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.darkGray};
  margin-bottom: ${theme.spacing.sm};
`;

const SlideInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.sm};
  
  svg {
    margin-right: ${theme.spacing.xs};
    font-size: 16px;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background-color: rgba(255, 255, 255, 0.9);
  color: ${theme.colors.darkGray};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const PresentationCard = ({ presentation }) => {
  const { id, title, thumbnail, lastEdited, owner, slides } = presentation;
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/editor/${id}`);
  };
  
  const handleMenuClick = (e) => {
    e.stopPropagation();
    // Open menu options
    console.log('Menu clicked for presentation:', id);
  };
  
  return (
    <Card onClick={handleClick}>
      <Thumbnail src={thumbnail}>
        <MenuButton onClick={handleMenuClick}>
          <MoreVert fontSize="small" />
        </MenuButton>
      </Thumbnail>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardMeta>
          <span>Edited {lastEdited}</span>
          <span>{owner}</span>
        </CardMeta>
        <SlideInfo>
          <Slideshow />
          {slides} slides
        </SlideInfo>
      </CardContent>
    </Card>
  );
};

export default PresentationCard;
