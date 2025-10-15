import { Container, Typography, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DisclaimerPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, sm: 6 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: theme.palette.mode === 'light' 
            ? '0 1px 3px rgba(246, 135, 18, 0.1)' 
            : '0 1px 3px rgba(246, 135, 18, 0.3)'
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700, 
            textAlign: 'center',
            mb: 4,
            color: 'primary.main'
          }}
        >
          Disclaimer
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600, 
            mt: 4,
            color: 'text.primary'
          }}
        >
          General Information
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          The information provided by Orange Music India ("we," "us," or "our") on this website 
          (the "Site") is for general informational purposes only. All information on the Site is 
          provided in good faith, however we make no representation or warranty of any kind, 
          express or implied, regarding the accuracy, adequacy, validity, reliability, availability, 
          or completeness of any information on the Site.
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF 
          ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION 
          PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON 
          THE SITE IS SOLELY AT YOUR OWN RISK.
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600, 
            mt: 4,
            color: 'text.primary'
          }}
        >
          Professional Disclaimer
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          The Site cannot and does not contain music advice. The music information is provided 
          for general informational and educational purposes only and is not a substitute for 
          professional advice. Accordingly, before taking any actions based upon such information, 
          we encourage you to consult with the appropriate professionals. We do not provide any 
          kind of music advice. The use or reliance of any information contained on this site is 
          solely at your own risk.
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600, 
            mt: 4,
            color: 'text.primary'
          }}
        >
          Content Disclaimer
        </Typography>
        
 <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          The Site may contain (or you may be sent through the Site) music content, text, 
          graphics, images, videos, or other material ("Content"). We do not make any warranties 
          about the completeness, reliability, and accuracy of this Content. Any action you take 
          upon the information you find on this Site is strictly at your own risk, and we will not 
          be liable for any losses and/or damages in connection with the use of our Site.
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          The Content reflects the personal opinions and experiences of the creators and may not 
          be representative of the experiences of others. The Content does not constitute a 
          warranty, guarantee, or prediction regarding the outcome of any music-related endeavor.
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600, 
            mt: 4,
            color: 'text.primary'
          }}
        >
          User-Generated Content
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          Orange Music India may contain links to third-party websites or services that are not 
          owned or controlled by Orange Music India. We have no control over, and assume no 
          responsibility for, the content, privacy policies, or practices of any third-party 
          websites or services. You further acknowledge and agree that Orange Music India shall 
          not be responsible or liable, directly or indirectly, for any damage or loss caused or 
          alleged to be caused by or in connection with the use of or reliance on any such content, 
          goods, or services available on or through any such websites or services.
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600, 
            mt: 4,
            color: 'text.primary'
          }}
        >
          Copyright Notice
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          All content on this Site, including text, graphics, logos, button icons, images, audio 
          clips, digital downloads, data compilations, and software, is the property of Orange 
          Music India or its content suppliers and protected by international copyright laws. 
          Unauthorized use of any content may violate copyright, trademark, and other laws.
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600, 
            mt: 4,
            color: 'text.primary'
          }}
        >
          Consent
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          By using our website, you hereby consent to our disclaimer and agree to its terms.
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600, 
            mt: 4,
            color: 'text.primary'
          }}
        >
          Updates
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          Should we update, amend or make any changes to this document, those changes will be 
          prominently posted here.
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mt: 4,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Paper>
    </Container>
  );
};

export default DisclaimerPage;