import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Speed,
  Security,
  SupportAgent,
  Apartment,
  LinkedIn,
  Email,
} from '@mui/icons-material';
import MyGrid from '../../../components/container/MyGrid';
import BoyProfile1 from 'src/assets/images/profile/BoyProfile1.jpg';
import BoyProfile2 from 'src/assets/images/profile/BoyProfile2.jpg';
import GirlProfile1 from 'src/assets/images/profile/GirlProfile1.jpg';
import OurMission from 'src/assets/images/backgrounds/OurMission.jpg';

const AboutPage = () => {
  const features = [
    {
      icon: <Speed />,
      title: 'Fast & Easy',
      description: 'Quick and simple rental process that saves your time and effort.'
    },
    {
      icon: <Security />,
      title: 'Secure Platform',
      description: 'Your data and transactions are protected with top-level security.'
    },
    {
      icon: <SupportAgent />,
      title: 'Dedicated Support',
      description: '24/7 customer support to assist you with any queries.'
    },
    {
      icon: <Apartment />,
      title: 'Verified Properties',
      description: 'All properties are verified to ensure quality and authenticity.'
    }
  ];

  const team = [
    {
      name: 'John Doe',
      position: 'CEO & Founder',
      image: BoyProfile1,
      linkedin: '#',
      email: 'john@example.com'
    },
    {
      name: 'Mike Johnson',
      position: 'Property Manager',
      image: BoyProfile2,
      linkedin: '#',
      email: 'jane@example.com'
    },
    {
      name: 'Jane Smith',
      position: 'Customer Relations',
      image: GirlProfile1,
      linkedin: '#',
      email: 'mike@example.com'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8,
          mb: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom align="center">
            About Us
          </Typography>
          <Typography variant="h6" align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
            We're making property rental simple, secure, and accessible for everyone.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <MyGrid container spacing={4} alignItems="center">
          <MyGrid xs={12} md={6}>
            <Box
              component="img"
              src={OurMission}
              alt="Our Mission"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
              }}
            />
          </MyGrid>
          <MyGrid xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              Our mission is to revolutionize the property rental experience by providing 
              a seamless, transparent, and efficient platform for both tenants and property owners.
            </Typography>
            <Typography paragraph>
              We believe that finding your perfect rental home should be an exciting journey, 
              not a stressful process. That's why we've created a platform that puts your 
              needs first.
            </Typography>
          </MyGrid>
        </MyGrid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Why Choose Us
          </Typography>
          <MyGrid container spacing={4}>
            {features.map((feature, index) => (
              <MyGrid xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <IconButton 
                      sx={{ 
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        mb: 2,
                        '&:hover': { bgcolor: 'primary.light' }
                      }}
                    >
                      {feature.icon}
                    </IconButton>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </MyGrid>
            ))}
          </MyGrid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Meet Our Team
        </Typography>
        <MyGrid container spacing={4}>
          {team.map((member, index) => (
            <MyGrid xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto',
                      mb: 2 
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {member.position}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <IconButton 
                      component="a"
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: 'primary.main' }}
                    >
                      <LinkedIn />
                    </IconButton>
                    <IconButton 
                      component="a"
                      href={`mailto:${member.email}`}
                      sx={{ color: 'primary.main' }}
                    >
                      <Email />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </MyGrid>
          ))}
        </MyGrid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <MyGrid container spacing={4} textAlign="center">
            <MyGrid xs={12} sm={4}>
              <Typography variant="h3" gutterBottom>
                1000+
              </Typography>
              <Typography variant="h6">
                Properties Listed
              </Typography>
            </MyGrid>
            <MyGrid xs={12} sm={4}>
              <Typography variant="h3" gutterBottom>
                500+
              </Typography>
              <Typography variant="h6">
                Happy Tenants
              </Typography>
            </MyGrid>
            <MyGrid xs={12} sm={4}>
              <Typography variant="h3" gutterBottom>
                50+
              </Typography>
              <Typography variant="h6">
                Cities Covered
              </Typography>
            </MyGrid>
          </MyGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage; 