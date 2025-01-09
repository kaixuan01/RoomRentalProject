import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import PropertyCard from '../../../components/Property/PropertyCard';
import PropertyFilter from '../../../components/Property/PropertyFilter.js';
import { mockProperties } from '../../../mock/propertyData';
import { useNavigate } from 'react-router-dom';
import MyGrid from '../../../components/container/MyGrid.js';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
  }, []);

  const handleFilter = (filters) => {
    let filtered = properties;
    
    // Only apply filters if there are any active filters
    if (filters.searchText || filters.propertyType || filters.propertyStatus || 
        filters.minArea || filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
      filtered = properties.filter(property => {
        const matchesSearch = !filters.searchText || 
          property.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          property.address.toLowerCase().includes(filters.searchText.toLowerCase());
        
        const matchesType = !filters.propertyType || 
          property.propertyType === filters.propertyType;
        
        const matchesStatus = !filters.propertyStatus || 
          property.propertyStatus === filters.propertyStatus;
        
        const matchesArea = !filters.minArea || 
          property.areaSize >= filters.minArea;
        
        const matchesPrice = property.price >= filters.priceRange[0] && 
          property.price <= filters.priceRange[1];

        return matchesSearch && matchesType && matchesStatus && 
          matchesArea && matchesPrice;
      });
    }

    setFilteredProperties(filtered);
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <>
      <PropertyFilter onFilter={handleFilter} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MyGrid container spacing={3}>
          {filteredProperties.map((property) => (
            <MyGrid item key={property.id} xs={12} sm={6} md={4}>
              <PropertyCard
                property={property}
                onViewDetails={handleViewDetails}
              />
            </MyGrid>
          ))}
        </MyGrid>

        {filteredProperties.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              No properties found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default PropertyListing;