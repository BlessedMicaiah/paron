import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
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
  PlayArrow
} from '@mui/icons-material';
import theme from '../styles/theme';
import SlidePreview from '../components/editor/SlidePreview';
import SlideEditor from '../components/editor/SlideEditor';
import FormatButton from '../components/editor/FormatButton';
import { usePresentations } from '../context/PresentationContext';

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
  background-color: ${theme.colors.background};
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.md};
  cursor: pointer;
  
  svg {
    margin-right: ${theme.spacing.xs};
  }
`;

const PresentationTitle = styled.input`
  border: none;
  font-size: ${theme.fontSizes.xl};
  font-weight: bold;
  margin-left: ${theme.spacing.xl};
  outline: none;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
  
  &:hover, &:focus {
    background-color: ${theme.colors.secondary};
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const PresentButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.md};
  font-weight: bold;
  cursor: pointer;
  
  svg {
    margin-right: ${theme.spacing.xs};
  }
`;

const EditorMain = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray};
  overflow-y: auto;
  padding: ${theme.spacing.md};
`;

const AddSlideButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.sm};
  width: 100%;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text};
  border: 1px dashed ${theme.colors.gray};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
  cursor: pointer;
  transition: ${theme.transition.fast};
  
  &:hover {
    background-color: ${theme.colors.gray};
  }
  
  svg {
    margin-right: ${theme.spacing.xs};
  }
`;

const SlidesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
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
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray};
`;

const ToolGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  padding-right: ${theme.spacing.md};
  border-right: 1px solid ${theme.colors.gray};
  
  &:last-child {
    border-right: none;
  }
`;

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPresentation, updatePresentation } = usePresentations();
  
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [title, setTitle] = useState('');
  const [presentation, setPresentation] = useState(null);
  
  // Load presentation data
  useEffect(() => {
    const presentationData = getPresentation(id);
    
    if (presentationData) {
      setPresentation(presentationData);
      setTitle(presentationData.title);
      
      // If this is a new presentation with no slide data yet, add default slides
      if (!presentationData.slideData) {
        setSlides(defaultSlides);
        // Save the default slides to the presentation
        updatePresentation(parseInt(id, 10), {
          slideData: defaultSlides,
          slides: defaultSlides.length
        });
      } else {
        setSlides(presentationData.slideData);
      }
    } else {
      // If presentation not found, redirect to dashboard
      navigate('/dashboard');
    }
  }, [id, getPresentation, navigate, updatePresentation]);
  
  // Save presentation data when title or slides change
  useEffect(() => {
    if (presentation) {
      const debounce = setTimeout(() => {
        updatePresentation(parseInt(id, 10), {
          title,
          slideData: slides,
          slides: slides.length
        });
      }, 500);
      
      return () => clearTimeout(debounce);
    }
  }, [title, slides, id, presentation, updatePresentation]);
  
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
    setTitle(e.target.value);
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
          <PresentButton>
            <PlayArrow />
            Present
          </PresentButton>
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
              <FormatButton 
                icon={<FormatBold />} 
                command="bold" 
                onCommand={applyFormatting} 
              />
              <FormatButton 
                icon={<FormatItalic />} 
                command="italic" 
                onCommand={applyFormatting} 
              />
              <FormatButton 
                icon={<FormatUnderlined />} 
                command="underline" 
                onCommand={applyFormatting} 
              />
            </ToolGroup>
            
            <ToolGroup>
              <FormatButton 
                icon={<FormatAlignLeft />} 
                command="justifyLeft" 
                onCommand={applyFormatting} 
              />
              <FormatButton 
                icon={<FormatAlignCenter />} 
                command="justifyCenter" 
                onCommand={applyFormatting} 
              />
              <FormatButton 
                icon={<FormatAlignRight />} 
                command="justifyRight" 
                onCommand={applyFormatting} 
              />
            </ToolGroup>
            
            <ToolGroup>
              <FormatButton 
                icon={<Image />} 
                command="insertImage" 
                value={() => prompt('Enter image URL:')}
                onCommand={applyFormatting} 
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
              />
              <FormatButton 
                icon={<TableChart />} 
                command="insertHTML" 
                value={() => {
                  const rows = prompt('Enter number of rows:', '2');
                  const cols = prompt('Enter number of columns:', '2');
                  
                  if (rows && cols) {
                    let tableHTML = '<table border="1" style="width:100%">';
                    for (let i = 0; i < parseInt(rows); i++) {
                      tableHTML += '<tr>';
                      for (let j = 0; j < parseInt(cols); j++) {
                        tableHTML += '<td style="padding:8px">Cell</td>';
                      }
                      tableHTML += '</tr>';
                    }
                    tableHTML += '</table>';
                    return tableHTML;
                  }
                  return '';
                }}
                onCommand={applyFormatting} 
              />
              <FormatButton 
                icon={<Category />} 
                command="insertHTML" 
                value={() => {
                  const shapeType = prompt('Select shape (1: Square, 2: Circle, 3: Triangle):', '1');
                  const shapes = [
                    '<div style="width:100px;height:100px;background-color:#3498db;border-radius:0px;"></div>',
                    '<div style="width:100px;height:100px;background-color:#e74c3c;border-radius:50%;"></div>',
                    '<div style="width:0;height:0;border-left:50px solid transparent;border-right:50px solid transparent;border-bottom:100px solid #2ecc71;"></div>'
                  ];
                  
                  if (shapeType && parseInt(shapeType) >= 1 && parseInt(shapeType) <= 3) {
                    return shapes[parseInt(shapeType) - 1];
                  }
                  return '';
                }}
                onCommand={applyFormatting} 
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
