import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: 1.5;
    height: 100%;
    overflow-x: hidden;
    transition: ${({ theme }) => theme.transition.normal};
    scroll-behavior: smooth;
  }

  #root {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    letter-spacing: -0.025em;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    background: ${({ theme }) => theme.colors.gradient.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transition.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
      text-decoration: underline;
    }
  }

  button, input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    transition: ${({ theme }) => theme.transition.fast};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}33`};
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textDisabled};
    }
  }

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.9em;
  }

  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.xl};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    
    th, td {
      padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
      text-align: left;
    }
    
    th {
      font-weight: 600;
      background-color: ${({ theme }) => theme.colors.surfaceAlt};
    }
    
    tr:last-child td {
      border-bottom: none;
    }
  }

  hr {
    border: none;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  .card {
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    transition: ${({ theme }) => theme.transition.normal};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: 500;
    transition: ${({ theme }) => theme.transition.normal};
    
    &.primary {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
      }
    }
    
    &.secondary {
      background-color: ${({ theme }) => theme.colors.surfaceAlt};
      color: ${({ theme }) => theme.colors.text};
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.border};
      }
    }
    
    &.outline {
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
      
      &:hover {
        background-color: ${({ theme }) => `${theme.colors.primary}11`};
      }
    }
    
    &.sm {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    }
    
    &.lg {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    }
    
    svg {
      margin-right: ${({ theme }) => theme.spacing.sm};
    }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    
    &.primary {
      background-color: ${({ theme }) => `${theme.colors.primary}22`};
      color: ${({ theme }) => theme.colors.primary};
    }
    
    &.success {
      background-color: ${({ theme }) => `${theme.colors.success}22`};
      color: ${({ theme }) => theme.colors.success};
    }
    
    &.warning {
      background-color: ${({ theme }) => `${theme.colors.warning}22`};
      color: ${({ theme }) => theme.colors.warning};
    }
    
    &.error {
      background-color: ${({ theme }) => `${theme.colors.error}22`};
      color: ${({ theme }) => theme.colors.error};
    }
  }

  .gradient-text {
    background: ${({ theme }) => theme.colors.gradient.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .gradient-border {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 2px;
      background: ${({ theme }) => theme.colors.gradient.primary};
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }
`;

export default GlobalStyles;
