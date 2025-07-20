const theme = {
  colors: {
    // Modern purple-blue gradient system
    primary: '#6366F1', // Indigo
    primaryHover: '#4F46E5',
    primaryLight: '#A5B4FC',
    primaryDark: '#3730A3',
    secondary: '#EC4899', // Pink
    secondaryHover: '#DB2777',
    secondaryLight: '#F9A8D4',
    accent: '#06B6D4', // Cyan
    accentHover: '#0891B2',
    accentLight: '#67E8F9',
    
    // Neutral colors - modern gray scale
    background: '#FAFBFC', // Very light gray
    backgroundAlt: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceHover: '#F1F5F9',
    surfaceAlt: '#F8FAFC',
    surfaceElevated: '#FFFFFF',
    
    // Text colors
    text: '#0F172A', // Slate 900
    textSecondary: '#475569', // Slate 600
    textTertiary: '#94A3B8', // Slate 400
    textDisabled: '#CBD5E1', // Slate 300
    textInverse: '#FFFFFF',
    
    // Semantic colors
    success: '#10B981', // Emerald
    successLight: '#D1FAE5',
    successDark: '#047857',
    error: '#EF4444', // Red
    errorLight: '#FEE2E2',
    errorDark: '#DC2626',
    warning: '#F59E0B', // Amber
    warningLight: '#FEF3C7',
    warningDark: '#D97706',
    info: '#3B82F6', // Blue
    infoLight: '#DBEAFE',
    infoDark: '#2563EB',
    
    // Border colors
    border: '#E2E8F0', // Slate 200
    borderLight: '#F1F5F9', // Slate 100
    borderDark: '#CBD5E1', // Slate 300
    borderFocus: '#6366F1', // Primary
    
    // Utility colors
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    
    // Modern gradients
    gradient: {
      primary: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
      secondary: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
      accent: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      surface: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
      background: 'linear-gradient(135deg, #FAFBFC 0%, #F1F5F9 100%)',
      dark: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      glass: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
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
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    // Legacy support
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
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
    ultrawide: '1920px',
  },
  // Media query helpers
  media: {
    mobile: '@media (min-width: 320px)',
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1024px)',
    wide: '@media (min-width: 1440px)',
    ultrawide: '@media (min-width: 1920px)',
    maxMobile: '@media (max-width: 767px)',
    maxTablet: '@media (max-width: 1023px)',
    maxDesktop: '@media (max-width: 1439px)',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    primary: '0 10px 15px -3px rgba(99, 102, 241, 0.1), 0 4px 6px -2px rgba(99, 102, 241, 0.05)',
    accent: '0 10px 15px -3px rgba(6, 182, 212, 0.1), 0 4px 6px -2px rgba(6, 182, 212, 0.05)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
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
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
  // Component sizes
  sizes: {
    button: {
      sm: { height: '32px', padding: '0 12px', fontSize: '0.875rem' },
      md: { height: '40px', padding: '0 16px', fontSize: '1rem' },
      lg: { height: '48px', padding: '0 24px', fontSize: '1.125rem' },
    },
    input: {
      sm: { height: '32px', padding: '0 12px', fontSize: '0.875rem' },
      md: { height: '40px', padding: '0 16px', fontSize: '1rem' },
      lg: { height: '48px', padding: '0 20px', fontSize: '1.125rem' },
    },
  },
};

// Utility functions for responsive design
export const responsive = {
  // Generate responsive CSS
  between: (minWidth, maxWidth) => `@media (min-width: ${minWidth}) and (max-width: ${maxWidth})`,
  above: (width) => `@media (min-width: ${width})`,
  below: (width) => `@media (max-width: ${width})`,
  
  // Responsive value helper
  value: (mobile, tablet = mobile, desktop = tablet, wide = desktop) => ({
    mobile,
    tablet,
    desktop,
    wide,
  }),
  
  // Generate responsive styles
  styles: (property, values) => {
    const { mobile, tablet, desktop, wide } = values;
    return `
      ${property}: ${mobile};
      ${theme.media.tablet} {
        ${property}: ${tablet};
      }
      ${theme.media.desktop} {
        ${property}: ${desktop};
      }
      ${theme.media.wide} {
        ${property}: ${wide};
      }
    `;
  },
};

export default theme;
