import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Stack,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  LocationOn, 
  Pool,
  FitnessCenter,
  LocalParking,
  Security,
  Wifi,
  CheckCircle,
  Cancel,
  Build,
  Close as CloseIcon,
  NavigateBefore,
  NavigateNext,
  SquareFoot,
  Square,
  MoreHoriz as MoreHorizIcon,
  AcUnit,
  LocalLaundryService,
  Pets,
  Balcony,
  Inventory,
  Videocam,
  Elevator,
  Park,
  OutdoorGrill,
  Park as PlaygroundIcon
} from '@mui/icons-material';
import { FacilityType, PropertyStatus } from '../../types/property.types.js';

const PropertyCard = ({ property, onViewDetails }) => {
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  
  // Get available photos (up to 3)
  const displayPhotos = property.photos.slice(0, 3);
  const photoCount = displayPhotos.length;

  // Show only first 3 facilities
  const maxVisibleFacilities = 3;
  const displayFacilities = property.facilities.slice(0, maxVisibleFacilities);
  const remainingCount = property.facilities.length - maxVisibleFacilities;

  // Dynamic styles based on number of photos
  const getImageContainerStyle = () => {
    if (photoCount === 3) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: 200,
        gap: '2px',
        overflow: 'hidden',
      };
    }
    return {
      display: 'flex',
      height: 200,
      overflow: 'hidden',
    };
  };

  // Get individual image container styles
  const getImageItemStyles = (index) => {
    const baseStyles = {
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
      '&:hover': {
        opacity: 0.9,
      },
    };

    if (photoCount === 3) {
      if (index === 0) {
        return {
          ...baseStyles,
          gridRow: '1 / span 2', // Span both rows
          height: '200px',
        };
      }
      return {
        ...baseStyles,
        height: '99px', // Slightly less than half to account for gap
      };
    }

    // Styles for 1 or 2 images
    return {
      ...baseStyles,
      width: photoCount === 1 ? '100%' : '50%',
      height: '200px',
      borderLeft: index > 0 ? '2px solid #fff' : 'none',
    };
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setOpenImageViewer(true);
  };

  const handleClose = () => {
    setOpenImageViewer(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? property.photos.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === property.photos.length - 1 ? 0 : prev + 1
    );
  };

  // Facility configuration with icons and labels
  const facilityConfig = {
    [FacilityType.Pool]: { 
      icon: <Pool fontSize="small" />, 
      label: 'Pool',
      color: 'info' 
    },
    [FacilityType.Gym]: { 
      icon: <FitnessCenter fontSize="small" />, 
      label: 'Gym',
      color: 'error' 
    },
    [FacilityType.Parking]: { 
      icon: <LocalParking fontSize="small" />, 
      label: 'Parking',
      color: 'primary' 
    },
    [FacilityType.Security]: { 
      icon: <Security fontSize="small" />, 
      label: 'Security',
      color: 'success' 
    },
    [FacilityType.WiFi]: { 
      icon: <Wifi fontSize="small" />, 
      label: 'WiFi',
      color: 'secondary' 
    },
    [FacilityType.AirCon]: { 
      icon: <AcUnit fontSize="small" />, 
      label: 'Air Con',
      color: 'info' 
    },
    [FacilityType.Laundry]: { 
      icon: <LocalLaundryService fontSize="small" />, 
      label: 'Laundry',
      color: 'primary' 
    },
    [FacilityType.PetFriendly]: { 
      icon: <Pets fontSize="small" />, 
      label: 'Pet Friendly',
      color: 'warning' 
    },
    [FacilityType.Balcony]: { 
      icon: <Balcony fontSize="small" />, 
      label: 'Balcony',
      color: 'success' 
    },
    [FacilityType.Storage]: { 
      icon: <Inventory fontSize="small" />, 
      label: 'Storage',
      color: 'secondary' 
    },
    [FacilityType.CCTV]: { 
      icon: <Videocam fontSize="small" />, 
      label: 'CCTV',
      color: 'error' 
    },
    [FacilityType.Elevator]: { 
      icon: <Elevator fontSize="small" />, 
      label: 'Elevator',
      color: 'primary' 
    },
    [FacilityType.Garden]: { 
      icon: <Park fontSize="small" />, 
      label: 'Garden',
      color: 'success' 
    },
    [FacilityType.BBQ]: { 
      icon: <OutdoorGrill fontSize="small" />, 
      label: 'BBQ Area',
      color: 'warning' 
    },
    [FacilityType.PlayArea]: { 
      icon: <PlaygroundIcon fontSize="small" />, 
      label: 'Play Area',
      color: 'info' 
    }
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
      bgcolor: 'background.paper', // Restore white background
    }}>
      {/* Image Gallery */}
      <Box sx={{ position: 'relative' }}>
        <Box sx={getImageContainerStyle()}>
          {displayPhotos.map((photo, index) => (
            <Box
              key={photo.id}
              onClick={() => handleImageClick(index)}
              sx={getImageItemStyles(index)}
            >
              <img
                src={photo.filePath}
                alt={`Property ${index + 1}`}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Status Badge */}
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

        {/* Price overlay */}
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

      <CardContent sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        pb: '16px !important',
        bgcolor: 'background.paper', // Ensure white background
      }}>
        {/* Property Title */}
        <Typography variant="h6" gutterBottom>
          {property.name}
        </Typography>

        {/* Location and Area */}
        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {property.address}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Square fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {property.areaSize.toLocaleString()} sq ft
            </Typography>
          </Box>
        </Box>

        {/* Facilities section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Facilities
          </Typography>
          <Box 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
              minHeight: '28px', // Reduced to single line height
              maxHeight: '28px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {displayFacilities.map((facility) => (
              <Chip
                key={facility}
                label={facilityConfig[facility]?.label}
                icon={facilityConfig[facility]?.icon}
                size="small"
                variant="outlined"
                sx={{
                  height: '24px',
                  bgcolor: 'background.paper',
                  '& .MuiChip-label': {
                    px: 1,
                  }
                }}
              />
            ))}
            {remainingCount > 0 && (
              <Tooltip 
                title={property.facilities
                  .slice(maxVisibleFacilities)
                  .map(f => facilityConfig[f]?.label)
                  .join(', ')
                }
              >
                <Chip
                  icon={<MoreHorizIcon />}
                  label={`+${remainingCount} more`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: '24px',
                    bgcolor: 'background.paper',
                    '& .MuiChip-label': {
                      px: 1,
                    }
                  }}
                />
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* Button at bottom */}
        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onViewDetails(property.id)}
            sx={{
              textTransform: 'none',
              mt: 1
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>

      {/* Image Viewer Dialog */}
      <Dialog
        open={openImageViewer}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        <Box sx={{ position: 'relative', bgcolor: 'black' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              zIndex: 1,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ 
            position: 'relative', 
            width: '100%',
            height: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Only show navigation buttons if there's more than one image */}
            {photoCount > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                >
                  <NavigateBefore />
                </IconButton>

                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                >
                  <NavigateNext />
                </IconButton>
              </>
            )}

            <img
              src={property.photos[selectedImageIndex]?.filePath}
              alt={`Property ${selectedImageIndex + 1}`}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Box>
      </Dialog>
    </Card>
  );
};

export default PropertyCard;