import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-size: 16px;
    line-height: 1.5;
    height: 100%;
    overflow-x: hidden;
    transition: ${theme.transition.normal};
    scroll-behavior: smooth;
  }

  #root {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 700;
    margin-bottom: ${theme.spacing.md};
    letter-spacing: -0.025em;
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    background: ${theme.colors.gradient.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textSecondary};
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transition.fast};
    position: relative;

    &:hover {
      color: ${theme.colors.primary};
    }

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: ${theme.colors.gradient.accent};
      transition: ${theme.transition.normal};
    }

    &:hover:after {
      width: 100%;
    }
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.body};
    font-weight: 500;
    border: none;
    outline: none;
    transition: ${theme.transition.normal};
    
    &:focus {
      outline: 2px solid ${theme.colors.accent};
      outline-offset: 2px;
    }
  }

  img {
    max-width: 100%;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.darkGray};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.accent};
  }

  /* Selection styling */
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  /* Glass morphism utility classes */
  .glass {
    background: ${theme.glass.background};
    backdrop-filter: ${theme.glass.backdropFilter};
    border: ${theme.glass.border};
    border-radius: ${theme.borderRadius.md};
  }

  .gold-text {
    text-shadow: 0 0 5px ${theme.colors.primary}, 0 0 10px ${theme.colors.primary};
  }

  .gold-border {
    border: 1px solid ${theme.colors.primary};
    box-shadow: ${theme.shadows.gold};
  }

  .accent-border {
    border: 1px solid ${theme.colors.accent};
    box-shadow: ${theme.shadows.accent};
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease forwards;
  }

  .slide-up {
    animation: slideUp 0.5s ease forwards;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Code styling */
  code, pre {
    font-family: ${theme.fonts.mono};
    background-color: ${theme.colors.surfaceAlt};
    border-radius: ${theme.borderRadius.sm};
  }

  code {
    padding: 0.2em 0.4em;
    font-size: 0.9em;
  }

  pre {
    padding: ${theme.spacing.md};
    overflow-x: auto;
  }
`;

export default GlobalStyles;
