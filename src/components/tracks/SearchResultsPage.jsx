import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Pagination, 
  CircularProgress, 
  Alert, 
  Stack,
  Chip,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { 
  Home as HomeIcon,
  TrendingUp,
  NewReleases,
  Star,
  FilterList,
  ViewModule,
  ViewList,
  Search as SearchIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import TrackCard from './TrackCard';

// Import API utility
import { trackAPI } from '../../utils/api';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  
  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, page]);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await trackAPI.search(query, page, 8);
      
      setTracks(response.tracks || []);
      setTotalPages(response.pages || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch search results');
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && tracks.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 2, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{ 
              mb: { xs: 2, sm: 3 },
              '& .MuiBreadcrumbs-separator': {
                color: 'text.secondary'
              }
            }}
          >
            <Link 
              component="a" 
              href="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
              Home
            </Link>
            <Typography 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'text.primary'
              }}
            >
              <SearchIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
              Search Results
            </Typography>
          </Breadcrumbs>
          
          {/* Header Section */}
          <Box sx={{ mb: { xs: 2, sm: 4 } }}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                background: 'linear-gradient(45deg, #f68712, #fb5e8c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Search Results
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                mb: 3
              }}
            >
              Showing results for: <strong>"{query}"</strong>
            </Typography>
            
            {tracks.length > 0 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2
              }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Found {tracks.length} result{tracks.length !== 1 ? 's' : ''}
                </Typography>
                
                <Stack direction="row" spacing={1} alignItems="center">
                  <ViewModule 
                    onClick={() => setViewMode('grid')}
                    sx={{ 
                      cursor: 'pointer',
                      color: viewMode === 'grid' ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }} 
                  />
                  <ViewList 
                    onClick={() => setViewMode('list')}
                    sx={{ 
                      cursor: 'pointer',
                      color: viewMode === 'list' ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }} 
                  />
                </Stack>
              </Box>
            )}
          </Box>
          
          {/* Results Section */}
          {tracks.length === 0 ? (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 6, 
                textAlign: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 2
              }}
            >
              <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                No results found
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                We couldn't find any tracks matching "{query}". Try different keywords.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/')}
                sx={{ 
                  px: 4,
                  py: 1.5
                }}
              >
                Browse All Music
              </Button>
            </Paper>
          ) : (
            <>
              <Grid 
                container 
                spacing={3}
                sx={{
                  mb: 4
                }}
              >
                {tracks.map((track) => (
                  <Grid 
                    item 
                    key={track._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <TrackCard track={track} />
                  </Grid>
                ))}
              </Grid>
              
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default SearchResultsPage;