import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import theme from './theme';

// Dark theme extends light theme with overrides
const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    
    // Background colors
    background: '#2C2417', // Dark gold-brown background
    surface: '#3A3020', // Dark surface
    surfaceAlt: '#4A3F28', // Slightly lighter surface
    
    // Text colors
    text: '#F5F0D5', // Light gold text
    textSecondary: '#D4C18F', // Medium gold text
    textDisabled: '#8A7A52', // Muted gold
    
    // Border colors
    border: '#6D5D2A', // Medium gold border
    divider: '#4A3F28', // Dark gold divider
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.36)',
    md: '0 3px 6px rgba(0,0,0,0.32), 0 3px 6px rgba(0,0,0,0.46)',
    lg: '0 10px 20px rgba(0,0,0,0.38), 0 6px 6px rgba(0,0,0,0.46)',
    xl: '0 14px 28px rgba(0,0,0,0.50), 0 10px 10px rgba(0,0,0,0.44)',
    primary: '0 0 10px rgba(241, 194, 50, 0.2), 0 0 20px rgba(241, 194, 50, 0.1)',
    accent: '0 0 10px rgba(212, 175, 55, 0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
  },
};

const ThemeProvider = ({ children }) => {
  // Get dark mode state from Redux
  const darkMode = useSelector((state) => state.ui.darkMode);
  const currentTheme = darkMode ? darkTheme : theme;
  
  return (
    <StyledThemeProvider theme={currentTheme}>
      {children}
    </StyledThemeProvider>
  );
};

export { theme, darkTheme };
export default ThemeProvider;
