import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import PropertyCard from '../../../components/Property/PropertyCard';
import PropertyFilter from '../../../components/Property/PropertyFilter.js';
import { useNavigate, useLocation } from 'react-router-dom';
import MyGrid from '../../../components/container/MyGrid.js';
import PropertyCardSkeleton from '../../../components/Property/PropertyCardSkeleton';
import { propertyService } from 'src/services/propertyService';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get and clear the state values
  const searchKeyword = location.state?.keyword || '';
  const propertyType = location.state?.propertyType || '';
  
  const [filters, setFilters] = useState({
    searchText: searchKeyword,
    propertyType: propertyType
  });
  const [totalCount, setTotalCount] = useState(0);

  const ITEMS_PER_PAGE = 9;
  const observer = useRef();

  // Fetch properties
  const fetchProperties = async (pageNum, currentFilters, isNewFilter = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const { properties: newProperties, totalCount, hasMore } = 
        await propertyService.getProperties({
          page: pageNum,
          limit: ITEMS_PER_PAGE,
          filters: currentFilters
        });

      setProperties(prev => isNewFilter ? newProperties : [...prev, ...newProperties]);
      setTotalCount(totalCount);
      setHasMore(hasMore);
    } catch (error) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProperties(1, { ...filters }, true);
    
    if (location.state) {
      // Replace the current history state with null state
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [filters.searchText]);

  // Handle pagination
  useEffect(() => {
    if (page === 1) return;
    fetchProperties(page, filters);
  }, [page]);

  // Last element ref callback
  const lastPropertyRef = useCallback(node => {
    if (isLoading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  // Handle filters
  const handleFilter = (newFilters) => {
    fetchProperties(1, newFilters, true);
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property-details/${propertyId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PropertyFilter 
        onFilter={handleFilter}
        initialFilters={filters} // Pass initial filters
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {totalCount > 0 && (
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Showing {properties.length} of {totalCount} properties
        </Typography>
      )}

      <MyGrid container spacing={3}>
        {properties.map((property, index) => (
          <MyGrid 
            key={property.id}
            ref={index === properties.length - 1 ? lastPropertyRef : null}
            xs={12}
            sm={6}
            md={4}
          >
            <PropertyCard
              property={property}
              onViewDetails={handleViewDetails}
            />
          </MyGrid>
        ))}
        
        {/* Show skeletons while loading more */}
        {isLoading && (
          <>
            {[...Array(3)].map((_, index) => (
              <MyGrid 
                key={`skeleton-${index}`}
                xs={12}
                sm={6}
                md={4}
              >
                <PropertyCardSkeleton />
              </MyGrid>
            ))}
          </>
        )}
      </MyGrid>

      {!isLoading && properties.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No properties found matching your criteria
          </Typography>
        </Box>
      )}

      {!hasMore && properties.length > 0 && (
        <Typography 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mt: 4 }}
        >
          You've reached the end of the list
        </Typography>
      )}
    </Container>
  );
};

export default PropertyListing;