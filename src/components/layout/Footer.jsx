import { Box, Typography, Container, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 1.5, 
        px: 2, 
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.background.paper // Light mode: paper background
            : theme.palette.background.default, // Dark mode: default background (darker)
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 0 }
        }}>
          {/* Logo on the left/top */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/images/orange.png" 
              alt="Orange Music India Logo" 
              style={{ height: 24, marginRight: 8 }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              Orange Music India
            </Typography>
          </Box>
          
          {/* Quick Links in the center */}
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'center' }
            }}>
            <Link 
              component={RouterLink} 
              to="/" 
              variant="body2" 
              color="text.secondary" 
              underline="hover"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Home
            </Link>
            <Link 
              component={RouterLink} 
              to="/about" 
              variant="body2" 
              color="text.secondary" 
              underline="hover"
              sx={{ whiteSpace: 'nowrap' }}
            >
              About
            </Link>
            <Link 
              component={RouterLink} 
              to="/contact" 
              variant="body2" 
              color="text.secondary" 
              underline="hover"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Contact
            </Link>
          </Stack>
          
          {/* Legal Links on the right/bottom */}
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'center' }
            }}>
            <Link 
              component={RouterLink} 
              to="/terms" 
              variant="body2" 
              color="text.secondary" 
              underline="hover"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Terms
            </Link>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              variant="body2" 
              color="text.secondary" 
              underline="hover"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Privacy
            </Link>
            <Link 
              component={RouterLink} 
              to="/copyright" 
              variant="body2" 
              color="text.secondary" 
              underline="hover"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Copyright
            </Link>
            <Link 
              component={RouterLink} 
              to="/disclaimer" 
              variant="body2" 
              color="text.secondary" 
              underline="hover"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Disclaimer
            </Link>
          </Stack>
        </Box>
        
        <Box sx={{ 
          mt: { xs: 1.5, sm: 1 }, 
          pt: 1, 
          borderTop: '1px solid', 
          borderColor: 'divider',
          textAlign: { xs: 'center', sm: 'center' }
        }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Orange Music India. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;