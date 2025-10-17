import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]); // Add playlist state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Add current track index

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Function to play an album (sets up the playlist)
  const playAlbum = (tracks) => {
    if (tracks && tracks.length > 0) {
      setPlaylist(tracks);
      setCurrentTrackIndex(0);
      setCurrentTrack(tracks[0]);
      setIsPlaying(true);
    }
  };

  // Function to play next track in playlist
  const playNextTrack = () => {
    if (playlist.length > 0 && currentTrackIndex < playlist.length - 1) {
      const nextIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(nextIndex);
      setCurrentTrack(playlist[nextIndex]);
      setIsPlaying(true);
    } else {
      // End of playlist, stop playback
      setIsPlaying(false);
    }
  };

  // Function to play previous track in playlist
  const playPreviousTrack = () => {
    if (playlist.length > 0 && currentTrackIndex > 0) {
      const prevIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
      setCurrentTrack(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    playlist,
    setPlaylist,
    currentTrackIndex,
    setCurrentTrackIndex,
    playAlbum,
    playNextTrack,
    playPreviousTrack
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};