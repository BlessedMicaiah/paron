const theme = {
  colors: {
    primary: '#D4AF37', // Rich gold
    secondary: '#222222', // Near black
    accent: '#FFD700', // Bright gold
    accentAlt: '#C0B283', // Muted gold
    background: '#FFFFFF', // White background
    surface: '#F8F8F8', // Very light gray for surfaces
    surfaceAlt: '#F0F0F0', // Light gray for alternate surfaces
    text: '#333333', // Dark gray text for contrast on white
    textSecondary: '#666666', // Medium gray for secondary text
    white: '#FFFFFF',
    gray: '#E0E0E0', // Light gray
    darkGray: '#CCCCCC', // Medium gray
    success: '#C0B283', // Muted gold for success
    error: '#B30000', // Deep red
    warning: '#D4AF37', // Gold for warnings
    gradient: {
      primary: 'linear-gradient(135deg, #D4AF37 0%, #9F8C3C 100%)',
      accent: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
    }
  },
  fonts: {
    heading: "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  shadows: {
    sm: '0 2px 5px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.08)',
    md: '0 4px 10px rgba(0, 0, 0, 0.08), 0 2px 5px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.06)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.1)',
    gold: '0 0 10px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.2)',
    accent: '0 0 10px rgba(255, 215, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.2)',
    inner: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  transition: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  },
  blur: {
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(16px)',
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(212, 175, 55, 0.1)',
    backdropFilter: 'blur(10px)',
  },
};

export default theme;
