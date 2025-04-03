import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import theme from '../../styles/theme';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${theme.colors.background};
  background-image: radial-gradient(
    circle at 80% 20%,
    ${theme.colors.surfaceAlt} 0%,
    transparent 20%
  ), 
  radial-gradient(
    circle at 20% 80%,
    rgba(212, 175, 55, 0.05) 0%,
    transparent 25%
  );
  color: ${theme.colors.text};
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.xl};
  background-color: transparent;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray};
    border-radius: ${theme.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.03);
  filter: blur(100px);
  z-index: 0;
  
  &.glow-1 {
    top: -200px;
    right: -200px;
  }
  
  &.glow-2 {
    bottom: -200px;
    left: -200px;
    background: rgba(255, 215, 0, 0.03);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s ease forwards;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>
        <Sidebar />
        <ContentArea>
          <BackgroundGlow className="glow-1" />
          <BackgroundGlow className="glow-2" />
          <ContentWrapper>{children}</ContentWrapper>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
