import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted');
  };

  const contactInfo = [
    {
      icon: <Phone />,
      title: 'Phone',
      content: '+1 234 567 890',
      link: 'tel:+1234567890'
    },
    {
      icon: <Email />,
      title: 'Email',
      content: 'contact@rentalhome.com',
      link: 'mailto:contact@rentalhome.com'
    },
    {
      icon: <LocationOn />,
      title: 'Address',
      content: '123 Rental Street, City, Country',
      link: 'https://maps.google.com'
    }
  ];

  const socialMedia = [
    { icon: <Facebook />, label: 'Facebook', link: '#' },
    { icon: <Twitter />, label: 'Twitter', link: '#' },
    { icon: <Instagram />, label: 'Instagram', link: '#' },
    { icon: <LinkedIn />, label: 'LinkedIn', link: '#' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Contact Form Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom>
            Get in Touch
          </Typography>
          <Typography color="text.secondary" paragraph>
            Have questions about renting? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={5}>
          <Box sx={{ pl: { md: 4 } }}>
            <Typography variant="h4" gutterBottom>
              Contact Information
            </Typography>
            
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                sx={{ 
                  mb: 2,
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    sx={{ 
                      mr: 2,
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.light' }
                    }}
                  >
                    {info.icon}
                  </IconButton>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography 
                      component="a"
                      href={info.link}
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {info.content}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {/* Social Media */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialMedia.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': { 
                        bgcolor: 'primary.light',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage; 