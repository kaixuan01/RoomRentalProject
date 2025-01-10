import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Dialog,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  LocationOn, 
  Close as CloseIcon,
  NavigateBefore,
  NavigateNext,
  SquareFoot,
  MoreHoriz as MoreHorizIcon
} from '@mui/icons-material';
import { FacilityConfig, StatusConfig } from '../../types/property.types.js';

const PropertyCard = ({ property, onViewDetails }) => {
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
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
            <SquareFoot fontSize="small" color="action" />
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
                label={FacilityConfig[facility]?.label}
                icon={FacilityConfig[facility]?.icon}
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
                  .map(f => FacilityConfig[f]?.label)
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