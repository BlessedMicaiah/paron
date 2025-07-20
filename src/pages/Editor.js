import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '../components/common/Toast';
import { validators, handleNetworkError } from '../utils/validation';
import { 
  Add, 
  Delete, 
  ContentCopy, 
  FormatAlignLeft, 
  FormatAlignCenter, 
  FormatAlignRight, 
  FormatBold, 
  FormatItalic, 
  FormatUnderlined,
  Image,
  VideoLibrary,
  TableChart,
  Category,
  ArrowBack,
  PlayArrow,
  FormatSize,
  FormatColorText,
  FormatListBulleted,
  FormatListNumbered,
  Undo,
  Redo,
  Save,
  MoreVert
} from '@mui/icons-material';
import { Button } from '../components/common';
import SlidePreview from '../components/editor/SlidePreview';
import SlideEditor from '../components/editor/SlideEditor';
import FormatButton from '../components/editor/FormatButton';
import { updatePresentation } from '../store/slices/presentationsSlice';

// Default slide template for new presentations
const defaultSlides = [
  {
    id: 1,
    title: 'Title Slide',
    content: '<h1>Welcome to Your Presentation</h1><h3>Created with Paron</h3>',
    background: '#ffffff'
  }
];

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.03) 0%, transparent 20%);
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.gradient.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  ${({ theme }) => theme.media.maxTablet} {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  
  ${({ theme }) => theme.media.maxTablet} {
    flex: 1;
    min-width: 0;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
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

const PresentationTitle = styled.input`
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transition.fast};
  min-width: 200px;
  
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
  
  ${({ theme }) => theme.media.maxTablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
    min-width: 150px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  
  ${({ theme }) => theme.media.maxTablet} {
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const SaveStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  
  ${({ theme }) => theme.media.maxMobile} {
    display: none;
  }
`;

const EditorMain = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 260px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[4]};
  
  ${({ theme }) => theme.media.maxTablet} {
    width: 220px;
    padding: ${({ theme }) => theme.spacing[3]};
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    display: none;
  }
`;

const AddSlideButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  background: ${({ theme }) => theme.colors.gradient.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  font-weight: 500;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SlidesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const EditorWorkspace = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow-x: auto;
  
  ${({ theme }) => theme.media.maxTablet} {
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    gap: ${({ theme }) => theme.spacing[2]};
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[1]};
  }
`;

const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding-right: ${({ theme }) => theme.spacing[3]};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-right: none;
    padding-right: 0;
  }
  
  ${({ theme }) => theme.media.maxMobile} {
    border-right: none;
    padding-right: 0;
    margin-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const ToolGroupLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: ${({ theme }) => theme.spacing[2]};
  
  ${({ theme }) => theme.media.maxMobile} {
    display: none;
  }
`;

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  
  // Get presentation from Redux store
  const presentations = useSelector(state => state.presentations.items);
  const presentation = presentations.find(p => p.id.toString() === id);
  
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  
  // Load presentation data
  useEffect(() => {
    if (presentation) {
      setTitle(presentation.title);
      
      // If this is a new presentation with no slide data yet, add default slides
      if (!presentation.slideData) {
        setSlides(defaultSlides);
        // Save the default slides to the presentation
        dispatch(updatePresentation({
          id: parseInt(id, 10),
          title: presentation.title,
          slideData: defaultSlides,
          slides: defaultSlides.length
        }));
      } else {
        setSlides(presentation.slideData || []);
      }
    } else {
      // If presentation not found, redirect to dashboard
      navigate('/dashboard');
    }
  }, [id, presentation, navigate, dispatch]);
  
  // Save presentation data when title or slides change
  useEffect(() => {
    if (presentation) {
      const debounce = setTimeout(() => {
        dispatch(updatePresentation({
          id: parseInt(id, 10),
          title,
          slideData: slides,
          slides: slides.length
        }));
      }, 500);
      
      return () => clearTimeout(debounce);
    }
  }, [title, slides, id, presentation, dispatch]);
  
  const addSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: `Slide ${slides.length + 1}`,
      content: '<h2>New Slide</h2><p>Add your content here</p>',
      background: '#ffffff'
    };
    
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };
  
  const deleteSlide = (slideId) => {
    // Don't allow deleting the last slide
    if (slides.length <= 1) return;
    
    const slideIndex = slides.findIndex(slide => slide.id === slideId);
    const newSlides = slides.filter(slide => slide.id !== slideId);
    
    setSlides(newSlides);
    
    // If we're deleting the current slide, select the previous slide or the first slide
    if (currentSlide === slideIndex) {
      setCurrentSlide(Math.max(0, currentSlide - 1));
    } else if (currentSlide > slideIndex) {
      // If we're deleting a slide before the current slide, adjust the current slide index
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const duplicateSlide = (slideId) => {
    const slideIndex = slides.findIndex(slide => slide.id === slideId);
    const slideToDuplicate = slides[slideIndex];
    
    const newSlide = {
      ...slideToDuplicate,
      id: slides.length + 1,
      title: `${slideToDuplicate.title} (Copy)`
    };
    
    const newSlides = [
      ...slides.slice(0, slideIndex + 1),
      newSlide,
      ...slides.slice(slideIndex + 1)
    ];
    
    setSlides(newSlides);
    // Select the newly created slide
    setCurrentSlide(slideIndex + 1);
  };
  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Validate title
    const error = validators.presentationTitle(newTitle);
    setTitleError(error);
    
    // Show toast for validation errors
    if (error && newTitle.length > 0) {
      toast.error(error);
    }
  };
  
  const handleBackClick = () => {
    navigate('/dashboard');
  };
  
  // Formatting handlers
  const applyFormatting = (command, value = null) => {
    try {
      // Make sure we're focused on the editable content
      if (window.currentEditableElement) {
        window.currentEditableElement.focus();
      }
      
      document.execCommand(command, false, value);
      
      // Update our slide content after formatting is applied
      if (slides[currentSlide]) {
        const updatedContent = window.currentEditableElement?.innerHTML || slides[currentSlide].content;
        const updatedSlide = {
          ...slides[currentSlide],
          content: updatedContent
        };
        
        const updatedSlides = [...slides];
        updatedSlides[currentSlide] = updatedSlide;
        setSlides(updatedSlides);
      }
    } catch (error) {
      console.error('Formatting error:', error);
    }
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <HeaderLeft>
          <BackButton onClick={handleBackClick}>
            <ArrowBack />
            Back to Dashboard
          </BackButton>
          <PresentationTitle 
            value={title} 
            onChange={handleTitleChange} 
          />
        </HeaderLeft>
        <HeaderRight>
          <SaveStatus>
            <Save />
            Saved
          </SaveStatus>
          <Button variant="primary" startIcon={<PlayArrow />}>
            Present
          </Button>
        </HeaderRight>
      </EditorHeader>
      
      <EditorMain>
        <Sidebar>
          <AddSlideButton onClick={addSlide}>
            <Add />
            Add Slide
          </AddSlideButton>
          
          <SlidesList>
            {slides.map((slide, index) => (
              <SlidePreview 
                key={slide.id}
                slide={slide}
                isActive={index === currentSlide}
                onClick={() => setCurrentSlide(index)}
                onDelete={() => deleteSlide(slide.id)}
                onDuplicate={() => duplicateSlide(slide.id)}
              />
            ))}
          </SlidesList>
        </Sidebar>
        
        <EditorWorkspace>
          <Toolbar>
            <ToolGroup>
              <ToolGroupLabel>Format</ToolGroupLabel>
              <FormatButton 
                icon={<FormatBold />} 
                command="bold" 
                onCommand={applyFormatting}
                tooltip="Bold (Ctrl+B)"
              />
              <FormatButton 
                icon={<FormatItalic />} 
                command="italic" 
                onCommand={applyFormatting}
                tooltip="Italic (Ctrl+I)"
              />
              <FormatButton 
                icon={<FormatUnderlined />} 
                command="underline" 
                onCommand={applyFormatting}
                tooltip="Underline (Ctrl+U)"
              />
            </ToolGroup>
            
            <ToolGroup>
              <ToolGroupLabel>Lists</ToolGroupLabel>
              <FormatButton 
                icon={<FormatListBulleted />} 
                command="insertUnorderedList" 
                onCommand={applyFormatting}
                tooltip="Bullet List"
              />
              <FormatButton 
                icon={<FormatListNumbered />} 
                command="insertOrderedList" 
                onCommand={applyFormatting}
                tooltip="Numbered List"
              />
            </ToolGroup>
            
            <ToolGroup>
              <ToolGroupLabel>Align</ToolGroupLabel>
              <FormatButton 
                icon={<FormatAlignLeft />} 
                command="justifyLeft" 
                onCommand={applyFormatting}
                tooltip="Align Left"
              />
              <FormatButton 
                icon={<FormatAlignCenter />} 
                command="justifyCenter" 
                onCommand={applyFormatting}
                tooltip="Align Center"
              />
              <FormatButton 
                icon={<FormatAlignRight />} 
                command="justifyRight" 
                onCommand={applyFormatting}
                tooltip="Align Right"
              />
            </ToolGroup>
            
            <ToolGroup>
              <ToolGroupLabel>Insert</ToolGroupLabel>
              <FormatButton 
                icon={<Image />} 
                command="insertImage" 
                value={() => prompt('Enter image URL:')}
                onCommand={applyFormatting}
                tooltip="Insert Image"
              />
              <FormatButton 
                icon={<VideoLibrary />} 
                command="insertHTML" 
                value={() => {
                  const url = prompt('Enter video embed URL:');
                  if (url) {
                    return `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
                  }
                  return '';
                }}
                onCommand={applyFormatting}
                tooltip="Insert Video"
              />
              <FormatButton 
                icon={<TableChart />} 
                command="insertHTML" 
                value={() => {
                  const rows = prompt('Enter number of rows:', '2');
                  const cols = prompt('Enter number of columns:', '2');
                  
                  if (rows && cols) {
                    let tableHTML = '<table border="1" style="width:100%; border-collapse: collapse;">';
                    for (let i = 0; i < parseInt(rows); i++) {
                      tableHTML += '<tr>';
                      for (let j = 0; j < parseInt(cols); j++) {
                        tableHTML += '<td style="padding:12px; border: 1px solid #ddd;">Cell</td>';
                      }
                      tableHTML += '</tr>';
                    }
                    tableHTML += '</table>';
                    return tableHTML;
                  }
                  return '';
                }}
                onCommand={applyFormatting}
                tooltip="Insert Table"
              />
            </ToolGroup>
            
            <ToolGroup>
              <ToolGroupLabel>Actions</ToolGroupLabel>
              <FormatButton 
                icon={<Undo />} 
                command="undo" 
                onCommand={applyFormatting}
                tooltip="Undo (Ctrl+Z)"
              />
              <FormatButton 
                icon={<Redo />} 
                command="redo" 
                onCommand={applyFormatting}
                tooltip="Redo (Ctrl+Y)"
              />
            </ToolGroup>
          </Toolbar>
          
          {slides[currentSlide] && (
            <SlideEditor 
              slide={slides[currentSlide]}
              onChange={(updatedSlide) => {
                const updatedSlides = [...slides];
                updatedSlides[currentSlide] = updatedSlide;
                setSlides(updatedSlides);
              }}
            />
          )}
        </EditorWorkspace>
      </EditorMain>
    </EditorContainer>
  );
};

export default Editor;
