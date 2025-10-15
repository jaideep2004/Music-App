import { createTheme } from '@mui/material/styles';

// Updated color palette with new scheme
const lightPalette = {
  primary: {
    main: '#f68712', // Orange - most dominant
    light: '#f89d3d',
    dark: '#d1730f',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#fb5e8c', // Pink
    light: '#fc7ca5',
    dark: '#d54f76',
    contrastText: '#ffffff',
  },
  success: {
    main: '#00a650', // Green - least dominant
    light: '#33b873',
    dark: '#008d44',
  },
  background: {
    default: '#F8F9FA',
    paper: '#ffffff',
    card: '#ffffff',
    hover: '#F5F6F7',
  },
  text: {
    primary: '#2D3748',
    secondary: '#718096',
    disabled: '#CBD5E0',
    hint: '#A0AEC0',
  },
  divider: 'rgba(226, 232, 240, 1)',
  grey: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
};

const darkPalette = {
  primary: {
    main: '#f68712', // Orange - most dominant
    light: '#f89d3d',
    dark: '#d1730f',
    contrastText: '#000000',
  },
  secondary: {
    main: '#fb5e8c', // Pink
    light: '#fc7ca5',
    dark: '#d54f76',
    contrastText: '#ffffff',
  },
  success: {
    main: '#00a650', // Green - least dominant
    light: '#33b873',
    dark: '#008d44',
  },
  background: {
    default: '#1A202C',
    paper: '#2D3748',
    card: '#2D3748',
    hover: '#4A5568',
  },
  text: {
    primary: '#F7FAFC',
    secondary: '#E2E8F0',
    disabled: '#A0AEC0',
    hint: '#718096',
  },
  divider: 'rgba(74, 85, 104, 1)',
  grey: {
    50: '#171923',
    100: '#1A202C',
    200: '#2D3748',
    300: '#4A5568',
    400: '#718096',
    500: '#A0AEC0',
    600: '#CBD5E0',
    700: '#E2E8F0',
    800: '#EDF2F7',
    900: '#F7FAFC',
  },
};

// Create theme function
export const createAppTheme = (mode) => {
  const palette = mode === 'light' ? lightPalette : darkPalette;
  
  return createTheme({
    palette: {
      mode,
      ...palette,
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.025em',
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.025em',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.025em',
      },
      body1: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.025em',
      },
      body2: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.025em',
        color: palette.text.secondary,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
        letterSpacing: '0.4px',
        color: palette.text.secondary,
      },
      overline: {
        fontSize: '0.625rem',
        fontWeight: 600,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        lineHeight: 1.5,
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.025em',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '8px 16px',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.875rem',
          },
          contained: {
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(0, 0, 0, 0.12)' 
              : '0 1px 3px rgba(0, 0, 0, 0.24)',
            '&:hover': {
              boxShadow: mode === 'light' 
                ? '0 2px 8px rgba(0, 0, 0, 0.15)' 
                : '0 2px 8px rgba(0, 0, 0, 0.3)',
            },
          },
          containedPrimary: {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          },
          containedSecondary: {
            backgroundColor: palette.secondary.main,
            color: palette.secondary.contrastText,
            '&:hover': {
              backgroundColor: palette.secondary.dark,
            },
          },
          outlined: {
            borderColor: palette.grey[300],
            color: palette.text.primary,
            '&:hover': {
              borderColor: palette.primary.main,
              backgroundColor: palette.background.hover || 'rgba(246, 135, 18, 0.04)',
            },
          },
          outlinedPrimary: {
            borderColor: palette.primary.main,
            color: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.primary.main,
              color: palette.primary.contrastText,
            },
          },
          outlinedSecondary: {
            borderColor: palette.secondary.main,
            color: palette.secondary.main,
            '&:hover': {
              backgroundColor: palette.secondary.main,
              color: palette.secondary.contrastText,
            },
          },
          text: {
            color: palette.text.primary,
            '&:hover': {
              backgroundColor: palette.background.hover || 'rgba(45, 55, 72, 0.04)',
            },
          },
          textPrimary: {
            color: palette.primary.main,
            '&:hover': {
              backgroundColor: 'rgba(246, 135, 18, 0.08)',
            },
          },
          textSecondary: {
            color: palette.secondary.main,
            '&:hover': {
              backgroundColor: 'rgba(251, 94, 140, 0.08)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border: mode === 'light' ? '1px solid #E2E8F0' : '1px solid #4A5568',
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
              : '0 1px 3px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: palette.background.card,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' 
                ? '0 4px 12px rgba(246, 135, 18, 0.15)' 
                : '0 4px 12px rgba(246, 135, 18, 0.3)',
              borderColor: mode === 'light' ? '#f68712' : '#f68712',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.paper,
            color: palette.text.primary,
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
              : '0 1px 3px rgba(0, 0, 0, 0.3)',
            borderBottom: `1px solid ${palette.divider}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundImage: 'none',
            backgroundColor: palette.background.paper,
          },
          elevation1: {
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(246, 135, 18, 0.12)' 
              : '0 1px 3px rgba(246, 135, 18, 0.24)',
          },
          elevation2: {
            boxShadow: mode === 'light' 
              ? '0 2px 8px rgba(246, 135, 18, 0.1)' 
              : '0 2px 8px rgba(246, 135, 18, 0.25)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
            fontSize: '0.75rem',
          },
          filled: {
            backgroundColor: palette.grey[100],
            color: palette.text.secondary,
            '&:hover': {
              backgroundColor: palette.grey[200],
            },
          },
          filledPrimary: {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
          },
          filledSecondary: {
            backgroundColor: palette.secondary.main,
            color: palette.secondary.contrastText,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 6,
              '& fieldset': {
                borderColor: palette.grey[300],
              },
              '&:hover fieldset': {
                borderColor: palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: palette.primary.main,
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: palette.grey[200],
          },
          barColorPrimary: {
            backgroundColor: palette.primary.main,
          },
        },
      },
    },
    shape: {
      borderRadius: 6,
    },
    spacing: 8,
    shadows: mode === 'light' ? [
      'none',
      '0 1px 2px rgba(246, 135, 18, 0.05)',
      '0 1px 3px rgba(246, 135, 18, 0.1)',
      '0 2px 8px rgba(246, 135, 18, 0.1)',
      '0 4px 12px rgba(246, 135, 18, 0.15)',
      '0 8px 16px rgba(246, 135, 18, 0.1)',
      '0 12px 24px rgba(246, 135, 18, 0.1)',
      '0 16px 32px rgba(246, 135, 18, 0.1)',
      '0 24px 48px rgba(246, 135, 18, 0.1)',
      ...Array(16).fill('0 24px 48px rgba(246, 135, 18, 0.1)'),
    ] : [
      'none',
      '0 1px 2px rgba(246, 135, 18, 0.2)',
      '0 1px 3px rgba(246, 135, 18, 0.3)',
      '0 2px 8px rgba(246, 135, 18, 0.3)',
      '0 4px 12px rgba(246, 135, 18, 0.4)',
      '0 8px 16px rgba(246, 135, 18, 0.3)',
      '0 12px 24px rgba(246, 135, 18, 0.3)',
      '0 16px 32px rgba(246, 135, 18, 0.3)',
      '0 24px 48px rgba(246, 135, 18, 0.3)',
      ...Array(16).fill('0 24px 48px rgba(246, 135, 18, 0.3)'),
    ],
  });
};

export default createAppTheme;