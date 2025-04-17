const theme = {
  colors: {
    primary: '#D4AF37', // Rich gold
    secondary: '#9D7E2E', // Darker gold
    accent: '#F1C232', // Bright gold
    accentAlt: '#FFD700', // Classic gold
    background: '#FFFCF0', // Very light gold background
    surface: '#FFFFFF', // Pure white for surfaces
    surfaceAlt: '#FFF8E1', // Very light gold for alternate surfaces
    text: '#3E2F00', // Dark brown text for contrast
    textSecondary: '#6D5D2A', // Medium brown for secondary text
    white: '#FFFFFF',
    gray: '#E5E7EB', // Light gray
    darkGray: '#D1D5DB', // Medium gray
    success: '#B8860B', // Dark goldenrod for success
    error: '#B22222', // Firebrick red
    warning: '#CD853F', // Peru (brownish gold) for warnings
    gradient: {
      primary: 'linear-gradient(135deg, #D4AF37 0%, #9D7E2E 100%)',
      accent: 'linear-gradient(135deg, #F1C232 0%, #B8860B 100%)',
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
    sm: '0 2px 5px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 10px rgba(0, 0, 0, 0.05), 0 2px 5px rgba(0, 0, 0, 0.03)',
    lg: '0 10px 25px rgba(212, 175, 55, 0.08), 0 5px 10px rgba(212, 175, 55, 0.04)',
    xl: '0 20px 40px rgba(212, 175, 55, 0.06)',
    primary: '0 0 10px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.2)',
    accent: '0 0 10px rgba(241, 194, 50, 0.4), 0 0 20px rgba(241, 194, 50, 0.2)',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  transition: {
    fast: 'all 0.15s ease',
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
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(59, 130, 246, 0.1)',
    backdropFilter: 'blur(12px)',
  },
};

export default theme;
