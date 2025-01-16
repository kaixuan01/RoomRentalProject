import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  MobileStepper,
  Fade,
} from '@mui/material';
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';

const ImageCarousel = ({ open, onClose, images, initialIndex = 0 }) => {
  const [activeStep, setActiveStep] = useState(initialIndex);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
    >
      <DialogContent sx={{ position: 'relative', p: 0, bgcolor: 'black' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            zIndex: 1,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <Close />
        </IconButton>

        <Box sx={{ position: 'relative', height: '80vh' }}>
          <Fade in={true} timeout={300}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2
              }}
            >
              <img
                src={images[activeStep].filePath}
                alt={`Image ${activeStep + 1}`}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Fade>
        </Box>

        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            bgcolor: 'transparent',
            color: 'white',
            '& .MuiMobileStepper-dot': {
              bgcolor: 'grey.500'
            },
            '& .MuiMobileStepper-dotActive': {
              bgcolor: 'white'
            }
          }}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{ color: 'white' }}
            >
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ color: 'white' }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageCarousel; 