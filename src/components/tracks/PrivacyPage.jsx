import { Box, Container, Typography, Paper } from "@mui/material";

const PrivacyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Your Privacy is Important to Us
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          At Orange Music India, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Information We Collect
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          <strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          <strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          <strong>Usage Data</strong> includes information about how you use our website, products and services.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          How We Use Your Information
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          - Where we need to perform the contract we are about to enter into or have entered into with you.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          - Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          - Where we need to comply with a legal or regulatory obligation.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Cookies
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Data Security
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Data Retention
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Your Legal Rights
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          If you wish to exercise any of the rights set out above, please contact us at privacy@orangemusicindia.com
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Changes to This Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, mt: 4 }}>
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          <strong>Contact Us:</strong> If you have any questions about this Privacy Policy, please contact us at privacy@orangemusicindia.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPage;