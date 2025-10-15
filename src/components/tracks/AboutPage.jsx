import { Box, Container, Typography, Paper } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          About Orange Music India
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Your Premier Music Platform
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          AudioHub is a cutting-edge music platform designed for both music enthusiasts and creators. 
          We provide a seamless experience for discovering, streaming, and sharing music while offering 
          powerful tools for artists to showcase their work.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Our Mission
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Our mission is to connect artists with their audience by providing an innovative platform 
          that celebrates musical diversity and creativity. We believe in empowering both emerging 
          and established artists to reach new heights while delivering exceptional listening 
          experiences to our global community.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          For Artists
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          AudioHub offers artists a comprehensive dashboard to upload, manage, and promote their music. 
          With our intuitive tools, you can easily organize your discography, track performance metrics, 
          and connect with fans worldwide. Our platform supports both single tracks and full albums, 
          giving you complete creative control.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          For Listeners
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Discover new music through our carefully curated collections and personalized recommendations. 
          Our advanced search and filtering capabilities help you find exactly what you're looking for, 
          while our high-quality streaming ensures the best possible listening experience. Create 
          playlists, follow your favorite artists, and never miss a new release.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Quality Commitment
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We maintain the highest standards for audio quality, supporting multiple formats to ensure 
          your music sounds exactly as intended. Our platform is built with modern web technologies 
          to provide a fast, responsive experience across all devices.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;