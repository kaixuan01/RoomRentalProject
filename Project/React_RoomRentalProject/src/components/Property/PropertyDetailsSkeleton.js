import React from 'react';
import {
  Container,
  Box,
  Paper,
  Skeleton,
} from '@mui/material';
import MyGrid from '../container/MyGrid';

const PropertyDetailsSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="text" width="20%" height={32} />
      </Box>

      {/* Image Gallery Skeleton */}
      <Box sx={{ mb: 4 }}>
        <MyGrid container spacing={2}>
          <MyGrid xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </MyGrid>
          <MyGrid xs={12} md={4}>
            <MyGrid container spacing={2}>
              {[...Array(4)].map((_, index) => (
                <MyGrid xs={6} key={index}>
                  <Skeleton variant="rectangular" height={190} sx={{ borderRadius: 2 }} />
                </MyGrid>
              ))}
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </Box>

      {/* Details Section Skeleton */}
      <MyGrid container spacing={4}>
        <MyGrid xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Skeleton variant="text" width="30%" height={32} />
            <Box sx={{ my: 2 }}>
              <Skeleton variant="text" />
            </Box>
            <MyGrid container spacing={2}>
              {[...Array(3)].map((_, index) => (
                <MyGrid xs={6} md={4} key={index}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                </MyGrid>
              ))}
            </MyGrid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Skeleton variant="text" width="30%" height={32} />
            <Box sx={{ my: 2 }}>
              <Skeleton variant="text" />
            </Box>
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} variant="text" />
            ))}
          </Paper>
        </MyGrid>

        <MyGrid xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Skeleton variant="text" width="40%" height={32} />
            <Box sx={{ my: 2 }}>
              <Skeleton variant="text" />
            </Box>
            <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={40} />
          </Paper>
        </MyGrid>
      </MyGrid>
    </Container>
  );
};

export default PropertyDetailsSkeleton; 