import { Box, Container, Typography, Paper } from "@mui/material";

const TermsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          Terms and Conditions
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Welcome to Orange Music India
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          These terms and conditions outline the rules and regulations for the use of Orange Music India's Website, located at www.orangemusicindia.com.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Orange Music India if you do not agree to take all of the terms and conditions stated on this page.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Intellectual Property
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Unless otherwise stated, Orange Music India and/or its licensors own the intellectual property rights for all material on Orange Music India. All intellectual property rights are reserved. You may access this from Orange Music India for your own personal use subjected to restrictions set in these terms and conditions.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          You must not:
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          - Republish material from Orange Music India
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          - Sell, rent or sub-license material from Orange Music India
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          - Reproduce, duplicate or copy material from Orange Music India
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          - Redistribute content from Orange Music India
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          User Content
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Orange Music India does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Orange Music India, its agents and/or affiliates.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Orange Music India reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          No Warranties
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Orange Music India is provided "as is," with all faults and without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Limitation of Liability
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          In no event shall Orange Music India, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Changes to These Terms
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the service.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, mt: 4 }}>
          <strong>Contact Us:</strong> If you have any questions about these Terms, please contact us at support@orangemusicindia.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsPage;