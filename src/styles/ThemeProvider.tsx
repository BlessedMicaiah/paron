import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Define our theme
const lightTheme = {
  colors: {
    primary: '#4361ee',
    secondary: '#3a0ca3',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
    
    // Background colors
    background: '#fafbfc',
    surface: '#ffffff',
    surfaceHover: '#f5f7fa',
    
    // Text colors
    text: '#212121',
    textSecondary: '#757575',
    textDisabled: '#9e9e9e',
    
    // Border colors
    border: '#e0e0e0',
    divider: '#f0f0f0',
    
    // Gradient
    gradient: {
      primary: 'linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)',
    },
    
    // UI colors
    white: '#ffffff',
    black: '#000000',
    gray: '#e0e0e0',
    darkGray: '#757575',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    circle: '50%',
  },
  
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    monospace: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  
  transition: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
};

// Dark theme extends light theme with overrides
const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    
    // Background colors
    background: '#121212',
    surface: '#1e1e1e',
    surfaceHover: '#2c2c2c',
    
    // Text colors
    text: '#f5f5f5',
    textSecondary: '#b0b0b0',
    textDisabled: '#6e6e6e',
    
    // Border colors
    border: '#333333',
    divider: '#2c2c2c',
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.36)',
    md: '0 3px 6px rgba(0,0,0,0.32), 0 3px 6px rgba(0,0,0,0.46)',
    lg: '0 10px 20px rgba(0,0,0,0.38), 0 6px 6px rgba(0,0,0,0.46)',
    xl: '0 14px 28px rgba(0,0,0,0.50), 0 10px 10px rgba(0,0,0,0.44)',
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Fix TypeScript error by properly typing the state
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
};

export { lightTheme, darkTheme };
export default ThemeProvider;
