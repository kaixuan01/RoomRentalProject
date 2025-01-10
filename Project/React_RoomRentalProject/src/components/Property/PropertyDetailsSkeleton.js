import React from 'react';
import {
  Container,
  Box,
  Grid,
  Paper,
  Skeleton,
} from '@mui/material';

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {[...Array(4)].map((_, index) => (
                <Grid item xs={6} key={index}>
                  <Skeleton variant="rectangular" height={190} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Details Section Skeleton */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Skeleton variant="text" width="30%" height={32} />
            <Box sx={{ my: 2 }}>
              <Skeleton variant="text" />
            </Box>
            <Grid container spacing={2}>
              {[...Array(3)].map((_, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                </Grid>
              ))}
            </Grid>
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
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Skeleton variant="text" width="40%" height={32} />
            <Box sx={{ my: 2 }}>
              <Skeleton variant="text" />
            </Box>
            <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={40} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyDetailsSkeleton; 