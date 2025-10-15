import { Box, Container, Typography, Paper } from "@mui/material";

const CopyrightPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          Copyright Information
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Ownership and Rights
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          All content, including but not limited to music tracks, album artwork, lyrics, videos, text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, available on Orange Music India (the "Service") is owned or licensed by Orange Music India and is protected by Indian and international copyright laws.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Music Content
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          All music tracks, albums, and related content available on Orange Music India are copyrighted by their respective artists, composers, lyricists, and record labels. Orange Music India acts as a platform to distribute this content and does not claim ownership of any musical works.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          The rights to reproduce, distribute, display, perform, create derivative works, and otherwise exploit the musical content remain with the original copyright holders unless explicitly transferred or licensed.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          User-Generated Content
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Users of Orange Music India may upload content, including music, images, and text. By uploading content to the Service, you grant Orange Music India a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, display, and perform such content in connection with the Service.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          You represent and warrant that you have all necessary rights to upload and distribute the content and that such content does not infringe upon the rights of any third party.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Website Content
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          The visual interfaces, graphics, design, compilation, information, computer code, products, software, services, and all other elements of the Service ("Materials") provided by Orange Music India are protected by Indian and international copyright, trademark, and other intellectual property laws.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Service without the express written permission of Orange Music India or the respective copyright owner.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Trademarks
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          "Orange Music India" and related logos, product and service names, designs, and slogans are trademarks of Orange Music India or its affiliates or licensors. You may not use such marks without the prior written permission of Orange Music India.
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Copyright Infringement Notification
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Orange Music India respects the intellectual property rights of others and expects users of the Service to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law and are properly provided to us.
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          1. A physical or electronic signature of the copyright owner or a person authorized to act on their behalf
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          2. Identification of the copyrighted work claimed to have been infringed
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          3. Identification of the material that is claimed to be infringing or to be the subject of infringing activity
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          4. Information reasonably sufficient to permit us to contact the complaining party
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          5. A statement that the complaining party has a good faith belief that use of the material is not authorized by the copyright owner
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, ml: 3 }}>
          6. A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7, mt: 4 }}>
          <strong>Copyright Agent Contact:</strong>
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Orange Music India<br />
          Copyright Department<br />
          Email: copyright@orangemusicindia.com<br />
          Phone: +91-XXX-XXXX-XXXX
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          Disclaimer
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
          Orange Music India may, but is not obligated to, monitor or review the content uploaded by users. Orange Music India does not control and is not responsible for the content, accuracy, or opinions expressed in such content, and such content does not reflect the opinions of Orange Music India.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CopyrightPage;