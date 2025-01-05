import React from 'react';
import { Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';
import Logo from '../../../assets/images/logos/SmallLogo.png';

const AboutUsPage = () => {
  return (
    <PageContainer title="About Us" description="Learn more about StaySeeker">
      <DashboardCard title="About Us">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2, textAlign: 'center' }}>
          <img src={Logo} alt="StaySeeker Logo" style={{ marginBottom: '20px', maxWidth: '200px' }} />

          <Typography variant="h6" gutterBottom>
            Welcome to StaySeeker!
          </Typography>
          <Typography variant="body1" paragraph>
            StaySeeker is your trusted platform for finding and renting your perfect home or room. Our mission is to make house and room rental easy, efficient, and accessible for everyone. Whether you're looking for a cozy room or a spacious house, StaySeeker offers a seamless experience to browse, book, and rent directly from our website.
          </Typography>
          <Typography variant="body1" paragraph>
            We believe in transparency and convenience, providing detailed listings with real-time availability and direct booking options. Say goodbye to the hassle of middlemen and hidden fees—StaySeeker connects you directly with the property owners and managers.
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform is designed with both tenants and property owners in mind. For tenants, we offer a user-friendly interface to search and filter properties that match your preferences. For property owners, StaySeeker provides a straightforward way to list and manage your rental properties.
          </Typography>
          <Typography variant="body1" paragraph>
            Join the StaySeeker community today and take the stress out of renting. Your next home is just a few clicks away!
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or need assistance, feel free to reach out to our support team. We’re here to help!
          </Typography>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default AboutUsPage;
