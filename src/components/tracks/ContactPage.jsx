import { Box, Container, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          Contact Us
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Get in Touch
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
              We'd love to hear from you! Whether you're an artist looking to join our platform, 
              a listener with feedback, or a potential partner, our team is ready to assist you.
            </Typography>
            
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Email sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">
                  <strong>Email:</strong> copyright@orangemusicindia.com
                </Typography>
              </Box>
              
              {/* <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Phone sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">
                  <strong>Address:</strong> 123 Music Street, Sound City, SC 12345
                </Typography>
              </Box> */}
            </Box>
          </Grid>
          
          {/* <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Send us a Message
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={6}
                variant="outlined"
                margin="normal"
                required
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2, px: 4 }}
              >
                Send Message
              </Button>
            </Box>
          </Grid> */}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactPage;