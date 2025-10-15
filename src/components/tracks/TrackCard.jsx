import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton, 
  Chip,
  Avatar,
  Stack,
  Button,
  Divider,
  Tooltip,
  Collapse
} from '@mui/material';
import { 
  PlayArrow, 
  Pause,
  ShoppingCart, 
  Favorite, 
  FavoriteBorder,
  MoreVert,
  AccessTime,
  Person,
  Album as AlbumIcon,
  Info,
  MusicNote
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// Removed WaveformPreview import since we're removing waveform from cards

const TrackCard = ({ track }) => {
  const navigate = useNavigate();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isCurrentTrack = currentTrack?._id === track._id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleClick = () => {
    navigate(`/track/${track._id}`);
  };

  // Helper function to get cover image URL
  const getCoverImageUrl = (coverImageFilename) => {
    if (!coverImageFilename) return '/placeholder-image.svg';
    // Ensure we're using the correct path for the image
    if (coverImageFilename.startsWith('http')) {
      return coverImageFilename; // Already a full URL
    }
    // Construct the full URL for the image
    return `https://music-app-backend.cloud/uploads/${coverImageFilename}`;
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Get primary artist name
  const getPrimaryArtist = () => {
    if (track.contributors && track.contributors.length > 0) {
      const artist = track.contributors.find(c => c.role === 'Artist') || track.contributors[0];
      return artist.name;
    }
    return 'Unknown Artist';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'background.card',
          width: '100%',
          maxWidth: '100%',
          maxHeight: 360,
        }}
      >
        {/* Cover Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="180"
            image={getCoverImageUrl(track.coverImage)}
            alt={track.title}
            sx={{
              objectFit: 'contain',
              backgroundColor: 'transparent',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              },
              width: '100%',
              maxHeight: { xs: 200, sm: 180 }
            }}
            onError={(e) => {
              e.target.src = '/placeholder-image.svg';
            }}
          />
          
          {/* Top overlay with icons */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 0.5,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
          >
            {/* <IconButton
              size="small"
              onClick={handleFavorite}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: isFavorited ? 'error.main' : 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
                width: 32,
                height: 32,
              }}
            >
              {isFavorited ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            </IconButton> */}
          </Box>
          
          {/* Type indicator */}
          <Chip
            label={track.type === 'Album' ? 'ALBUM' : 'SINGLE'}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(130, 197, 69, 0.9)',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 600,
              height: 20,
            }}
          />
        </Box>

        {/* Removed Waveform Section - only for Singles */}
        {/* Content Section */}
        <CardContent sx={{ flexGrow: 1, py: 1.5, px: 1.5 }}>
          {/* Title and Artist */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              fontSize: '0.9rem',
              lineHeight: 1.2,
              mb: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.2em'
            }}
          >
            {track.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.8rem'
            }}
          >
            <Person fontSize="small" sx={{ fontSize: '0.9rem' }} />
            {getPrimaryArtist()}
          </Typography>
          
          {/* Metadata chips */}
          <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
            <Chip 
              label={track.genre} 
              size="small" 
              variant="outlined"
              sx={{ 
                fontSize: '0.65rem',
                height: 20,
                borderColor: 'primary.main',
                color: 'primary.main'
              }}
            />
            
            {track.type === 'Single' ? (
              <Chip 
                icon={<AccessTime sx={{ fontSize: '0.7rem' }} />}
                label={formatDuration(track.duration)} 
                size="small" 
                variant="filled"
                sx={{ 
                  fontSize: '0.65rem',
                  height: 20,
                  backgroundColor: 'grey.100',
                  color: 'text.secondary'
                }}
              />
            ) : (
              <Chip 
                icon={<AlbumIcon sx={{ fontSize: '0.7rem' }} />}
                label="Album"
                size="small" 
                variant="filled"
                sx={{ 
                  fontSize: '0.65rem',
                  height: 20,
                  backgroundColor: 'grey.100',
                  color: 'text.secondary'
                }}
              />
            )}
          </Stack>
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}>
            <Typography variant='body2' color='text.secondary'>
              Plays:
            </Typography>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              {track.listenCount >= 1000000 
                ? `${(track.listenCount / 1000000).toFixed(1)}M` 
                : track.listenCount >= 1000 
                  ? `${(track.listenCount / 1000).toFixed(1)}K` 
                  : track.listenCount}
            </Typography>
          </Box>
          
          {/* Additional info on hover */}
          <Collapse in={isHovered} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.7rem' }}>
                <Info fontSize="small" sx={{ fontSize: '0.8rem' }} />
                {track.type === 'Single' 
                  ? `Published: ${new Date(track.publishDate).toLocaleDateString('en-GB')}`
                  : `Published: ${new Date(track.publishDate).toLocaleDateString('en-GB')} • ${track.contributors?.length || 0} contributors${track.trackCount ? `, ${track.trackCount} tracks` : ''}`
                }
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
        
        <Divider />
        
        {/* Action Bar - Simplified without pricing and add to cart */}
        <Box sx={{ p: 1.5, pt: 1, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="small"
            startIcon={isCurrentlyPlaying ? <Pause sx={{ fontSize: '1rem' }} /> : <PlayArrow sx={{ fontSize: '1rem' }} />}
            onClick={handlePlayPause}
            sx={{
              px: 2,
              py: 0.8,
              fontSize: '0.8rem'
            }}
          >
            {isCurrentlyPlaying ? 'Pause' : 'Play'}
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default TrackCard;