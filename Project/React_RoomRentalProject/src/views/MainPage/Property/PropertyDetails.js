import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip,
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
  PropertyType, 
  PropertyStatus,
  FacilityType,
  FacilityConfig,
  StatusConfig,
  getPropertyTypeLabel
} from '../../../types/property.types';
import MyGrid from '../../../components/container/MyGrid';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality with backend
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
                    {/* Status Badge */}
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
          <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h6" gutterBottom>
              Contact Agent
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => {/* TODO: Implement contact functionality */}}
            >
              Contact Now
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {/* TODO: Implement schedule viewing */}}
            >
              Schedule Viewing
            </Button>
          </Paper>
        </MyGrid>
      </MyGrid>
    </Container>
  );
};

export default PropertyDetails; 