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
  overflow: auto;
`;

const SlideContainer = styled.div`
  width: 960px;
  height: 540px;
  background-color: ${props => props.background || theme.colors.white};
  box-shadow: ${theme.shadows.lg};
  border-radius: ${theme.borderRadius.md};
  position: relative;
  overflow: auto;
`;

const EditableContent = styled(ContentEditable)`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing.xl};
  outline: none;
  
  h1 {
    font-size: ${theme.fontSizes['5xl']};
    margin-bottom: ${theme.spacing.lg};
  }
  
  h2 {
    font-size: ${theme.fontSizes['3xl']};
    margin-bottom: ${theme.spacing.md};
  }
  
  h3 {
    font-size: ${theme.fontSizes['2xl']};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.md};
  }
  
  ul, ol {
    padding-left: 40px;
    margin-bottom: ${theme.spacing.md};
  }
  
  li {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.sm};
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${theme.spacing.md};
  }
  
  td {
    border: 1px solid ${theme.colors.gray};
    padding: ${theme.spacing.sm};
  }
  
  img {
    max-width: 100%;
  }
  
  iframe {
    max-width: 100%;
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
