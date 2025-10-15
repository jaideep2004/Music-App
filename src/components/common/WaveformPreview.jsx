import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

const WaveformPreview = ({ 
  audioUrl, 
  isPlaying, 
  onPlayPause, 
  height = 80, 
  width = '100%',
  color = '#82C545',
  backgroundColor = '#E2E8F0',
  showPlayButton = true,
  isAlbum = false // New prop to indicate if this is for an album
}) => {
  const canvasRef = useRef(null);
  const [waveformData, setWaveformData] = useState([]);

  // Generate pseudo-waveform data for demo purposes
  // In a real app, you'd analyze the actual audio file
  useEffect(() => {
    const generateWaveform = () => {
      const points = 100; // Number of waveform points
      const data = [];
      
      for (let i = 0; i < points; i++) {
        // Create a pseudo-random waveform that looks realistic
        const base = Math.sin(i * 0.1) * 0.3;
        const noise = (Math.random() - 0.5) * 0.4;
        const envelope = Math.sin((i / points) * Math.PI) * 0.8;
        const amplitude = Math.max(0.1, Math.min(0.9, base + noise + envelope));
        data.push(amplitude);
      }
      
      setWaveformData(data);
    };

    generateWaveform();
  }, [audioUrl, isAlbum]);

  // Draw waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !waveformData.length) return;

    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Calculate dimensions
    const barWidth = canvasWidth / waveformData.length;
    const maxBarHeight = canvasHeight * 0.8;
    const centerY = canvasHeight / 2;
    
    // Draw waveform bars
    waveformData.forEach((amplitude, index) => {
      const barHeight = amplitude * maxBarHeight;
      const x = index * barWidth;
      const y = centerY - barHeight / 2;
      
      // Set color based on playing state
      // For albums, we'll use a different visual style
      if (isAlbum) {
        ctx.fillStyle = isPlaying && index < waveformData.length * 0.3 ? '#666666' : '#CCCCCC';
      } else {
        ctx.fillStyle = isPlaying && index < waveformData.length * 0.3 ? color : backgroundColor;
      }
      
      // Draw bar with rounded corners
      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(1, barWidth - 1), barHeight, 1);
      ctx.fill();
    });
  }, [waveformData, isPlaying, color, backgroundColor, isAlbum]);

  const handleClick = (e) => {
    if (onPlayPause) {
      e.preventDefault();
      e.stopPropagation();
      onPlayPause();
    }
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center',
        cursor: onPlayPause ? 'pointer' : 'default',
        borderRadius: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent'
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        width={300}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '4px'
        }}
      />
      
      {showPlayButton && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 1,
            },
            '.waveform-container:hover &': {
              opacity: 1,
            }
          }}
        >
          <IconButton
            size="small"
            onClick={handleClick}
            sx={{
              backgroundColor: isAlbum ? 'rgba(102, 102, 102, 0.9)' : 'rgba(130, 197, 69, 0.9)',
              color: 'white',
              '&:hover': {
                backgroundColor: isAlbum ? 'rgba(102, 102, 102, 1)' : 'rgba(130, 197, 69, 1)',
              },
              width: 32,
              height: 32,
            }}
          >
            {isPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default WaveformPreview;