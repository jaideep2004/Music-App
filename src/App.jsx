import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { useAuth } from './contexts/AuthContext';

// Import our custom theme
import createAppTheme from './themes/theme';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './components/tracks/HomePage';
import TrackDetailPage from './components/tracks/TrackDetailPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AboutPage from './components/tracks/AboutPage';
import ContactPage from './components/tracks/ContactPage';
import TermsPage from './components/tracks/TermsPage';
import PrivacyPage from './components/tracks/PrivacyPage';
import CopyrightPage from './components/tracks/CopyrightPage';
import DisclaimerPage from './components/tracks/DisclaimerPage';
import SearchResultsPage from './components/tracks/SearchResultsPage';

// Player Component
import AudioPlayer from './components/player/AudioPlayer';

// Auth Context
import { AuthProvider } from './contexts/AuthContext';

// App content that uses the auth context
const AppContent = ({ mode, toggleMode }) => {
  const { currentTrack, isPlaying, setIsPlaying } = useAuth();
  
  return (
    <>
      <Header mode={mode} toggleMode={toggleMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/track/:id" element={<TrackDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/copyright" element={<CopyrightPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
      {/* Audio player - only show when there's a current track */}
      {currentTrack && (
        <AudioPlayer 
          track={currentTrack} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
        />
      )}
    </>
  );
};

function App() {
  const [mode, setMode] = useState('dark');

  // Load theme preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = createAppTheme(mode);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={3000}
        >
          <CssBaseline />
          <Router>
            <AppContent mode={mode} toggleMode={toggleMode} />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;