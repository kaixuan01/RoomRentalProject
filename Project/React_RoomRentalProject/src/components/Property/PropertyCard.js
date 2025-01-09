import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Stack
} from '@mui/material';
import { 
  LocationOn, 
  Square,
  Pool,
  FitnessCenter,
  LocalParking,
  Security,
  Wifi,
  CheckCircle,
  Cancel,
  Build
} from '@mui/icons-material';
import { FacilityType, PropertyStatus } from '../../types/property.types.js';

const PropertyCard = ({ property, onViewDetails }) => {
  const mainPhoto = property.photos.find(photo => photo.isMain)?.filePath || '/assets/images/placeholder.jpg';

  // Facility configuration with icons and labels
  const facilityConfig = {
    [FacilityType.Pool]: { icon: <Pool fontSize="small" />, label: 'Pool' },
    [FacilityType.Gym]: { icon: <FitnessCenter fontSize="small" />, label: 'Gym' },
    [FacilityType.Parking]: { icon: <LocalParking fontSize="small" />, label: 'Parking' },
    [FacilityType.Security]: { icon: <Security fontSize="small" />, label: 'Security' },
    [FacilityType.WiFi]: { icon: <Wifi fontSize="small" />, label: 'WiFi' }
  };

  // Updated status configuration with better contrast
  const statusConfig = {
    [PropertyStatus.Available]: { 
      icon: <CheckCircle fontSize="small" />, 
      label: 'Available',
      color: 'success',
      bgColor: 'rgba(46, 125, 50, 0.1)', // darker green background
      textColor: '#2e7d32' // dark green text
    },
    [PropertyStatus.Rented]: { 
      icon: <Cancel fontSize="small" />, 
      label: 'Rented',
      color: 'error',
      bgColor: 'rgba(211, 47, 47, 0.1)', // darker red background
      textColor: '#d32f2f' // dark red text
    },
    [PropertyStatus.Maintenance]: { 
      icon: <Build fontSize="small" />, 
      label: 'Under Maintenance',
      color: 'warning',
      bgColor: 'rgba(237, 108, 2, 0.1)', // darker orange background
      textColor: '#ed6c02' // dark orange text
    }
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Image Container with Gradient Overlay */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={mainPhoto}
          alt={property.name}
          sx={{
            objectFit: 'cover'
          }}
        />
        {/* Dark gradient overlay for better text visibility */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        
        {/* Status Badge with background for better visibility */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1
          }}
        >
          <Chip
            icon={statusConfig[property.propertyStatus]?.icon}
            label={statusConfig[property.propertyStatus]?.label}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: statusConfig[property.propertyStatus]?.textColor,
              fontWeight: '600',
              '& .MuiChip-icon': {
                color: 'inherit'
              },
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </Box>

        {/* Price overlay on image */}
        <Typography 
          variant="h6" 
          sx={{ 
            position: 'absolute',
            bottom: 16,
            left: 16,
            color: 'white',
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            zIndex: 1
          }}
        >
          ${property.price.toLocaleString()}/month
        </Typography>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          {/* Property Name */}
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            {property.name}
          </Typography>

          {/* Location and Area with improved contrast */}
          <Box sx={{ color: 'text.secondary' }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOn />
              <Typography variant="body2">
                {property.address}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Square />
              <Typography variant="body2">
                {property.areaSize.toLocaleString()} sq ft
              </Typography>
            </Box>
          </Box>

          {/* Facilities Section */}
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ mb: 1, color: 'text.secondary' }}
            >
              Facilities
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {property.facilities.map((facility) => (
                <Chip
                  key={facility}
                  icon={facilityConfig[facility]?.icon}
                  label={facilityConfig[facility]?.label}
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '& .MuiChip-icon': {
                      color: 'primary.main'
                    },
                    fontWeight: '500'
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* View Details Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => onViewDetails(property.id)}
            sx={{
              mt: 'auto',
              textTransform: 'none',
              fontWeight: '600',
              py: 1,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            View Details
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;