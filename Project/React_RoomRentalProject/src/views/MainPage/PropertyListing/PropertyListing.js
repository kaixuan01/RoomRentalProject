import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Modal, Card, CardContent, CardMedia, Slider, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// SearchBar Component
const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);  // Calls the parent function to perform the search
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <TextField 
        label="Search for properties" 
        variant="outlined" 
        fullWidth 
        value={searchQuery} 
        onChange={handleSearchChange} 
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </div>
  );
};

// PropertyCard Component
const PropertyCard = ({ property, onClick }) => {
  return (
    <Card onClick={() => onClick(property)} style={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={property.image}
        alt={property.name}
      />
      <CardContent>
        <Typography variant="h6">{property.name}</Typography>
        <Typography variant="body2">{property.location}</Typography>
        <Typography variant="body2">{property.price}</Typography>
      </CardContent>
    </Card>
  );
};

// PropertyDetails Component
const PropertyDetails = ({ property, open, onClose }) => {
  if (!property) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: '20px', background: 'white', margin: '50px auto', width: '60%' }}>
        <Typography variant="h5">{property.name}</Typography>
        <Typography variant="body1">{property.details}</Typography>
        <Typography variant="h6">Price: {property.price}</Typography>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

// Landing Page Component
const LandingPage = () => {
  const Properties = [
    { id: 1, name: 'Cozy House', location: 'New York', price: 100, image: 'house.jpg', details: 'Beautiful 2-bed house.' },
    { id: 2, name: 'Modern Apartment', location: 'San Francisco', price: 200, image: 'apartment.jpg', details: 'Luxury 3-bed apartment.' },
    { id: 3, name: 'Test Apartment', location: 'San', price: 300, image: 'apartment.jpg', details: 'Luxury 4-bed apartment.' },
    { id: 4, name: 'Test 2 Apartment', location: 'San 2', price: 400, image: 'apartment.jpg', details: 'Luxury 5-bed apartment.' },
    { id: 5, name: 'Test 3 Apartment', location: 'San 3', price: 500, image: 'apartment.jpg', details: 'Luxury 6-bed apartment.' }
  ];

  const [properties, setProperties] = useState(Properties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleSearch = (query) => {
    const filteredProperties = Properties.filter(property => property.name.toLowerCase().includes(query.toLowerCase()));
    setProperties(filteredProperties);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    const filteredProperties = Properties.filter(property => property.price >= newValue[0] && property.price <= newValue[1]);
    setProperties(filteredProperties);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleShowMore = () => {
    // Navigate to a new page (assuming it's "/properties")
    //history.push('/properties');
  };

  return (
    <PageContainer title="Property Rental" description="Search and view rental properties">
      <SearchBar onSearch={handleSearch} />
      
      {/* Price Filter */}
      <Box mb={4}>
        <Typography variant="h6">Filter by Price</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          valueLabelFormat={(value) => `$${value}`}
        />
      </Box>

      {/* Featured Properties */}
      <Typography variant="h5" mb={3}>Featured Properties</Typography>
      <Grid container spacing={3}>
        {properties.slice(0, 3).map(property => (  // Display only 3 properties
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} onClick={handlePropertyClick} />
          </Grid>
        ))}
      </Grid>

      {/* Show More Button */}
      <Box mt={3} textAlign="center">
        <Button variant="contained" onClick={handleShowMore}>Show More</Button>
      </Box>

      {/* Property Details Modal */}
      <PropertyDetails 
        property={selectedProperty} 
        open={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </PageContainer>
  );
};

export default LandingPage;
