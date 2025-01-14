import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Card,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  LocationOn,
  Share,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { propertyService } from '../../../services/propertyService';
import PropertyDetailsSkeleton from '../../../components/Property/PropertyDetailsSkeleton';
import { 
  FacilityConfig,
  StatusConfig,
  getPropertyTypeLabel
} from '../../../types/property.types';
import MyGrid from '../../../components/container/MyGrid';
import { useSelector } from 'react-redux';
import LoginDialog from '../../../components/dialog/LoginDialog';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openRentDialog, setOpenRentDialog] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState('12'); // Default 12 months
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [actionAfterLogin, setActionAfterLogin] = useState(null);
  const isLoggedIn = useSelector((state) => state.isLogin) ?? false; 

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setIsLoading(true);
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleShare = () => {
    navigator.share({
      title: property.name,
      text: `Check out this property: ${property.name}`,
      url: window.location.href,
    }).catch((error) => console.log('Error sharing', error));
  };

  const handleProtectedAction = (action) => {
    if (!isLoggedIn) {
      setActionAfterLogin(action);
      setOpenLoginDialog(true);
      return false;
    }
    return true;
  };

  const handleToggleFavorite = () => {
    if (handleProtectedAction('favorite')) {
      setIsFavorite(!isFavorite);
      // TODO: Implement favorite functionality with backend
    }
  };

  const handleRentNow = () => {
    if (handleProtectedAction('rent')) {
      setOpenRentDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenRentDialog(false);
  };

  const handleSubmitRental = (event) => {
    event.preventDefault();
    // TODO: Implement rental submission
    console.log('Rental submitted');
    setOpenRentDialog(false);
  };

  const handleLoginSuccess = () => {
    setOpenLoginDialog(false);
    if (actionAfterLogin === 'favorite') {
      handleToggleFavorite();
    } else if (actionAfterLogin === 'rent') {
      handleRentNow();
    }
    setActionAfterLogin(null);
  };

  if (isLoading) {
    return <PropertyDetailsSkeleton />;
  }

  if (!property) {
    return (
      <Container>
        <Typography variant="h5" color="error" textAlign="center" py={4}>
          Property not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {property.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOn color="action" />
              <Typography variant="subtitle1" color="text.secondary">
                {property.address}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={handleShare} sx={{ mr: 1 }}>
              <Share />
            </IconButton>
            <IconButton onClick={handleToggleFavorite} color={isFavorite ? 'error' : 'default'}>
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h5" color="primary" gutterBottom>
          ${property.price.toLocaleString()}
        </Typography>
      </Box>

      {/* Image Gallery */}
      <Box sx={{ mb: 4 }}>
        <MyGrid container spacing={2}>
          <MyGrid xs={12} md={8}>
            <Box
              component="img"
              src={property.photos[0]?.filePath}
              alt={property.name}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </MyGrid>
          <MyGrid xs={12} md={4}>
            <MyGrid container spacing={2}>
              {property.photos.slice(1, 5).map((photo, index) => (
                <MyGrid xs={6} key={index}>
                    <Box>
                        <img
                            src={photo.filePath}
                            alt={`${property.name} ${index + 2}`}
                            style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                            }}
                        />
                        </Box>
                  
                </MyGrid>
              ))}
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </Box>

      {/* Details Section */}
      <MyGrid container spacing={4}>
        <MyGrid xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Property Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            <MyGrid container spacing={2}>
              <MyGrid xs={6} md={4}>
                <Typography color="text.secondary">Property Type</Typography>
                <Typography variant="subtitle1">
                    {getPropertyTypeLabel(property.propertyType)}
                </Typography>
              </MyGrid>
              <MyGrid xs={6} md={4}>
                <Typography color="text.secondary">Status</Typography>
                <Typography variant="subtitle1">
                    <Box>
                    <Chip
                        icon={StatusConfig[property.propertyStatus]?.icon}
                        label={StatusConfig[property.propertyStatus]?.label}
                        sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: StatusConfig[property.propertyStatus]?.textColor,
                        fontWeight: '600',
                        '& .MuiChip-icon': {
                            color: 'inherit'
                        },
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    />
                    </Box>

                </Typography>
              </MyGrid>
              <MyGrid xs={6} md={4}>
                <Typography color="text.secondary">Area Size</Typography>
                <Typography variant="subtitle1">{property.areaSize} sq ft</Typography>
              </MyGrid>
            </MyGrid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>{property.description}</Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Facilities
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" flexWrap="wrap" gap={1}>
              {property.facilities.map((facilityId) => {
                const facility = FacilityConfig[facilityId];
                return (
                  <Tooltip key={facilityId} title={facility?.description || ''}>
                    <Chip
                      icon={facility?.icon}
                      label={facility?.label}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiChip-icon': {
                          color: facility?.color
                        }
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Paper>
        </MyGrid>

        {/* Contact Section */}
        <MyGrid xs={12} md={4}>
          <Card sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Rental Details
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Monthly Rent:</Typography>
                <Typography variant="h6" color="primary">
                  ${property.price.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Security Deposit:</Typography>
                <Typography>
                  ${(property.price * 2).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Available From:</Typography>
                <Typography>
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Minimum Stay:</Typography>
                <Typography>12 months</Typography>
              </Box>

              <Button 
                variant="contained" 
                size="large"
                fullWidth
                onClick={handleRentNow}
              >
                Rent Now
              </Button>

              <Alert severity="info" sx={{ mt: 2 }}>
                Direct rental available. No agent fees!
              </Alert>
            </Stack>
          </Card>
        </MyGrid>
      </MyGrid>

      {/* Rental Dialog */}
      <Dialog open={openRentDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmitRental}>
          <DialogTitle>Rent Property</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                select
                label="Rental Period"
                value={rentalPeriod}
                onChange={(e) => setRentalPeriod(e.target.value)}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
              </TextField>

              <TextField
                label="Move-in Date"
                type="date"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0]
                }}
              />

              <TextField
                label="Additional Notes"
                multiline
                rows={4}
                fullWidth
              />

              <Alert severity="info">
                By submitting this form, you agree to proceed with the rental application process.
                A security deposit of ${(property.price * 2).toLocaleString()} will be required.
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit Application
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <LoginDialog 
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Container>
  );
};

export default PropertyDetails; 