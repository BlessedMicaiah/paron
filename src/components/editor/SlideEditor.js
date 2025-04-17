import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import theme from '../../styles/theme';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background};
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 20%);
  overflow: auto;
`;

const SlideContainer = styled.div`
  width: 960px;
  height: 540px;
  background-color: ${props => props.background || theme.colors.surface};
  box-shadow: ${theme.shadows.lg};
  border-radius: ${theme.borderRadius.md};
  position: relative;
  overflow: auto;
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: ${theme.transition.normal};
  
  &:hover {
    box-shadow: ${theme.shadows.xl};
  }
`;

const EditableContent = styled(ContentEditable)`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing.xl};
  outline: none;
  
  h1 {
    font-size: ${theme.fontSizes['5xl']};
    margin-bottom: ${theme.spacing.lg};
    background: ${theme.colors.gradient.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  
  h2 {
    font-size: ${theme.fontSizes['3xl']};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary};
  }
  
  h3 {
    font-size: ${theme.fontSizes['2xl']};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.md};
    line-height: 1.6;
  }
  
  ul, ol {
    padding-left: 40px;
    margin-bottom: ${theme.spacing.md};
  }
  
  li {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.sm};
    line-height: 1.6;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.sm};
    overflow: hidden;
  }
  
  td, th {
    border: 1px solid ${theme.colors.gray};
    padding: ${theme.spacing.md};
  }
  
  th {
    background-color: rgba(59, 130, 246, 0.05);
    font-weight: 600;
  }
  
  img {
    max-width: 100%;
    border-radius: ${theme.borderRadius.sm};
  }
  
  iframe {
    max-width: 100%;
    border-radius: ${theme.borderRadius.sm};
    border: none;
  }
  
  blockquote {
    border-left: 4px solid ${theme.colors.accent};
    padding-left: ${theme.spacing.md};
    margin-left: 0;
    margin-bottom: ${theme.spacing.md};
    font-style: italic;
    color: ${theme.colors.textSecondary};
  }
  
  code {
    font-family: ${theme.fonts.mono};
    background-color: ${theme.colors.surfaceAlt};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: 0.9em;
  }
  
  pre {
    background-color: ${theme.colors.surfaceAlt};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${theme.spacing.md};
  }
`;

// This function is required to expose contentEditable ref to parent components
const SlideEditor = ({ slide, onChange }) => {
  const editableRef = useRef(null);
  const contentRef = useRef(slide.content);
  
  // Expose the contentEditable ref to the window for toolbar access
  useEffect(() => {
    window.currentEditableElement = editableRef.current?.el || null;
    
    return () => {
      window.currentEditableElement = null;
    };
  }, []);
  
  const handleChange = (evt) => {
    contentRef.current = evt.target.value;
    if (onChange) {
      onChange({
        ...slide,
        content: contentRef.current
      });
    }
  };
  
  return (
    <EditorContainer>
      <SlideContainer background={slide.background}>
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
