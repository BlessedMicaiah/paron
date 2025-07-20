import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import { CloudUpload, DragIndicator } from '@mui/icons-material';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 20%);
  overflow: auto;
`;

const SlideContainer = styled.div`
  width: 960px;
  height: 540px;
  background-color: ${props => props.background || props.theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
  overflow: auto;
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: ${({ theme }) => theme.transition.normal};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const EditableContent = styled(ContentEditable)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  outline: none;
  
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.gradient.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.6;
  }
  
  ul, ol {
    padding-left: 40px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  li {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.6;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    overflow: hidden;
  }
  
  td, th {
    border: 1px solid ${({ theme }) => theme.colors.gray};
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  th {
    background-color: rgba(59, 130, 246, 0.05);
    font-weight: 600;
  }
  
  img {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
  
  iframe {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    border: none;
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.accent};
    padding-left: ${({ theme }) => theme.spacing.md};
    margin-left: 0;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.9em;
  }
  
  pre {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const DragDropOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(212, 175, 55, 0.1);
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(2px);
  
  svg {
    width: 48px;
    height: 48px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
  
  p {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    margin: 0;
  }
`;

// This function is required to expose contentEditable ref to parent components
const SlideEditor = ({ slide, onChange }) => {
  const editableRef = useRef(null);
  const contentRef = useRef(slide.content);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  
  // Expose the contentEditable ref to the window for toolbar access
  useEffect(() => {
    window.currentEditableElement = editableRef.current?.el || null;
    
    return () => {
      window.currentEditableElement = null;
    };
  }, []);
  
  const handleChange = useCallback((evt) => {
    contentRef.current = evt.target.value;
    if (onChange) {
      onChange({
        ...slide,
        content: contentRef.current
      });
    }
  }, [slide, onChange]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter === 1) {
      setIsDragging(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (file.type.startsWith('image/')) {
        // Handle image upload
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          const imageHtml = `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`;
          
          // Insert image at cursor position or append to content
          const currentContent = contentRef.current;
          const newContent = currentContent + imageHtml;
          contentRef.current = newContent;
          
          if (onChange) {
            onChange({
              ...slide,
              content: newContent
            });
          }
        };
        reader.readAsDataURL(file);
      }
      
      e.dataTransfer.clearData();
    }
  }, [slide, onChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            // Auto-save is handled by parent component
            break;
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              document.execCommand('redo');
            } else {
              e.preventDefault();
              document.execCommand('undo');
            }
            break;
          case 'y':
            e.preventDefault();
            document.execCommand('redo');
            break;
          default:
            break;
        }
      }
    };

    const editorElement = editableRef.current?.el;
    if (editorElement) {
      editorElement.addEventListener('keydown', handleKeyDown);
      return () => editorElement.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  
  return (
    <EditorContainer>
      <SlideContainer 
        background={slide.background}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isDragging && (
          <DragDropOverlay>
            <CloudUpload />
            <p>Drop images here to add them to your slide</p>
          </DragDropOverlay>
        )}
        
        <EditableContent
          innerRef={editableRef}
          html={contentRef.current}
          onChange={handleChange}
          contentEditable={true}
          spellCheck={false}
        />
      </SlideContainer>
    </EditorContainer>
  );
};

export default SlideEditor;
