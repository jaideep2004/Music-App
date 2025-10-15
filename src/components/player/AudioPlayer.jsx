import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Slider, 
  IconButton, 
  Typography, 
  Paper,
  Tooltip
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  SkipNext, 
  SkipPrevious, 
  VolumeUp,
  VolumeOff,
  Download
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const AudioPlayer = ({ track, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(70); // Store volume as 0-100 scale
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Helper function to get audio file URL
  const getAudioUrl = (audioFilename) => {
    if (!audioFilename) return '';
    // Ensure we're using the correct path for the audio
    if (audioFilename.startsWith('http')) {
      return audioFilename; // Already a full URL
    }
    // Construct the full URL for the audio
    return `https://music-app-backend.cloud/uploads/${audioFilename}`;
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    // Convert 0-100 scale to 0-1 scale for HTML audio element
    audioRef.current.volume = newValue / 100;
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume / 100;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  // Handle progress change
  const handleProgressChange = (event, newValue) => {
    setProgress(newValue);
    audioRef.current.currentTime = (newValue / 100) * duration;
  };

  // Update progress as audio plays
  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (track && track.audioFile) {
      const audioUrl = getAudioUrl(track.audioFile);
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = track.title || 'track';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Set up audio element
  useEffect(() => {
    if (audioRef.current && track) {
      // Set the audio source
      audioRef.current.src = getAudioUrl(track.audioFile);
      // Convert 0-100 scale to 0-1 scale for HTML audio element
      audioRef.current.volume = volume / 100;
      
      // Set up event listeners
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      
      // Play or pause based on isPlaying state
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error('Playback failed:', e));
      } else {
        audioRef.current.pause();
      }
      
      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateProgress);
        }
      };
    }
  }, [track, isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      // Convert 0-100 scale to 0-1 scale for HTML audio element
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          backgroundColor: 'background.paper',
          borderRadius: '0 !important'
        }}
      >
        <audio ref={audioRef} />
        
        {/* Progress bar */}
        <Slider
          value={progress}
          onChange={handleProgressChange}
          aria-label="Progress"
          sx={{ mb: 1 }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Track info */}
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 200 }}>
            <Box
              component="img"
              src={track.coverImage ? `https://music-app-backend.cloud/uploads/${track.coverImage}` : '/placeholder-image.svg'}
              alt={track.title}
              sx={{ 
                width: 50, 
                height: 50, 
                borderRadius: 1,
                mr: 2,
                objectFit: 'cover'
              }}
            />
            <Box>
              <Typography variant="body1" noWrap>
                {track.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {track.contributors && track.contributors.length > 0 
                  ? track.contributors[0].name 
                  : 'Unknown Artist'}
              </Typography>
            </Box>
          </Box>
          
          {/* Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small">
              <SkipPrevious />
            </IconButton>
            <IconButton 
              onClick={togglePlayPause}
              sx={{ mx: 1 }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton size="small">
              <SkipNext />
            </IconButton>
          </Box>
          
          {/* Volume and additional controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 200, justifyContent: 'flex-end' }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
            <Tooltip title={isMuted ? "Unmute" : "Mute"}>
              <IconButton onClick={toggleMute} size="small">
                {isMuted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
            </Tooltip>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              sx={{ width: 100, mx: 1 }}
            />
            <Tooltip title="Download">
              <IconButton onClick={handleDownload} size="small">
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default AudioPlayer;