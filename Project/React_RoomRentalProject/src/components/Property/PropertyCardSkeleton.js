import React from 'react';
import { Card, CardContent, Box, Skeleton } from '@mui/material';

const PropertyCardSkeleton = () => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Image skeleton */}
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={200}
        animation="wave"
      />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title skeleton */}
        <Skeleton variant="text" width="80%" height={32} />

        {/* Location and area skeletons */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={24} />
        </Box>

        {/* Facilities skeletons */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="30%" height={24} />
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
          </Box>
        </Box>

        {/* Button skeleton */}
        <Box sx={{ mt: 'auto' }}>
          <Skeleton variant="rounded" width="100%" height={36} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCardSkeleton;