import { useState, useEffect } from 'react';
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
  ViewList
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import TrackCard from './TrackCard';

// Import API utility
import { trackAPI } from '../../utils/api';

const HomePage = () => {
  const [tracks, setTracks] = useState([]);
  const [genres, setGenres] = useState([]); // Add state for genres
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Change default to 'all'
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  
  // Update categories to include dynamic genres
  const staticCategories = [
    { id: 'all', label: 'All Items', icon: <Star /> },
    { id: 'new', label: 'New Items', icon: <NewReleases /> },
    { id: 'popular', label: 'Popular Items', icon: <TrendingUp /> }
  ];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' }
  ];

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await trackAPI.getGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [page, selectedCategory, sortBy]);

  const fetchTracks = async () => {
    setLoading(true);
    setError('');
    try {
      // Prepare query parameters
      const queryParams = {
        page: page,
        pageSize: 8
      };
      
      // If a genre is selected (and it's not one of our special categories)
      if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'new' && selectedCategory !== 'popular' && selectedCategory !== 'featured') {
        queryParams.genre = selectedCategory;
      }
      
      // Use the trackAPI utility instead of direct fetch
      const data = await trackAPI.getAll(page, 8);
      
      setTracks(data.tracks || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch tracks');
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page
  };
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1); // Reset to first page
  };

  // Combine static categories with dynamic genres
  const allCategories = [
    ...staticCategories,
    ...genres.map(genre => ({
      id: genre,
      label: genre,
      icon: null
    }))
  ];

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
    <Box sx={{ backgroundColor: 'background.default', pb: 6 }}>
      <Container maxWidth="xl" sx={{ 
        pt: { xs: 2, sm: 4 }, 
        px: { xs: 0, sm: 2 }
      }}>
       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section - Move categories here */}
          <Box sx={{ mb: { xs: 2, sm: 4 } }}>
            {/* Category Pills - Moved outside of filters and below the heading */}
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                mb: { xs: 2, sm: 4 },
                overflowX: 'auto',
                pb: 1,
                px: { xs: 1, sm: 0 }
              }}
              style={{justifyContent: 'center'}}
            >
              {allCategories.map((category) => (
                <Chip
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  clickable
                  onClick={() => handleCategoryChange(category.id)}
                  variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                  color={selectedCategory === category.id ? 'primary' : 'default'}
                  sx={{
                    minWidth: { xs: 'fit-content', sm: 'fit-content' },
                    fontWeight: 600,
                    px: { xs: 1, sm: 2 },
                    py: { xs: 0.5, sm: 1 },
                    height: { xs: 32, sm: 40 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    '&:hover': {
                      backgroundColor: selectedCategory === category.id ? 'primary.dark' : 'primary.50'
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </motion.div>

        {/* Content Grid */}
        {tracks.length === 0 && !loading ? (
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: 2,
              boxShadow: 1,
              textAlign: 'center',
              mx: { xs: 1, sm: 2 }
            }}
          >
            No tracks available. Check back later for new releases!
          </Alert>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { 
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(5, 1fr)',
                xl: 'repeat(5, 1fr)'
              },
              gap: { xs: 0, sm: 1, md: 1 },
              px: { xs: 3, sm: 0 }
            }}>
              {tracks.map((track, index) => (
                <Box 
                  key={track._id}
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    px: { xs: 1, sm: 1, md: 1.5 },
                    pb: { xs: 2, sm: 0 }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      ease: 'easeOut'
                    }}
                    style={{ width: '100%' }}
                  >
                    <TrackCard track={track} />
                  </motion.div>
                </Box>
              ))}
            </Box>

            {/* Loading indicator for more content */}
            {loading && tracks.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress size={40} />
              </Box>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: { xs: 3, sm: 6 },
                  py: { xs: 2, sm: 4 }
                }}
              >
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontWeight: 600,
                      minWidth: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 }
                    }
                  }}
                />
              </Box>
            )}
            
            {/* View More Button */}
            <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 4 } }}>
              <Button 
                variant="contained" 
                sx={{
                  px: { xs: 3, sm: 6 },
                  py: { xs: 1, sm: 1.5 },
                  fontWeight: 600,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                View more new items
              </Button>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;