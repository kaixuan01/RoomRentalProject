import {React, useState, useEffect} from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Apartment,
  HomeWork,
  Home,
  Business,
  TrendingUp,
  Security,
  Payment,
  Support,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockProperties } from '../../../mock/propertyData';
import PropertyCard from '../../../components/Property/PropertyCard';
import PropertyCardSkeleton from '../../../components/Property/PropertyCardSkeleton';
import { PropertyType } from '../../../types/property.types.js';
import MyGrid from '../../../components/container/MyGrid.js';
import { propertyService } from 'src/services/propertyService';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 3;

  // Property types with icons
  const propertyTypes = [
    { icon: <Apartment />, label: 'Apartment', count: '250+', index: PropertyType.Apartment },
    { icon: <HomeWork />, label: 'Villa', count: '100+', index: PropertyType.Villa },
    { icon: <Home />, label: 'House', count: '150+', index: PropertyType.House },
    { icon: <Business />, label: 'Condo', count: '180+', index: PropertyType.Condo },
  ];

  // Fetch properties
  const fetchProperties = async (pageNum, currentFilters, isNewFilter = false) => {
    try {
      setIsLoading(true);

      const { properties: newProperties, totalCount, hasMore } = 
        await propertyService.getProperties({
          page: pageNum,
          limit: ITEMS_PER_PAGE,
          filters: currentFilters
        });

      setProperties(prev => newProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProperties(1, {}, true);
  }, []);

  // Benefits/Features
  const benefits = [
    {
      icon: <TrendingUp />,
      title: 'Easy Booking',
      description: 'Book your desired property with just a few clicks'
    },
    {
      icon: <Security />,
      title: 'Secure Process',
      description: 'Safe and secure rental process with verification'
    },
    {
      icon: <Payment />,
      title: 'Online Payment',
      description: 'Hassle-free payment options for your convenience'
    },
    {
      icon: <Support />,
      title: '24/7 Support',
      description: 'Round-the-clock support for all your queries'
    },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchKeyword.trim()) {
      navigate('/property-listing', {
        state: { keyword: searchKeyword }
      });
    }
  };

  const handlePropertyTypeClick = (propertyType) => {
    navigate('/property-listing', { 
      state: { 
        propertyType: propertyType // Pass the property type
      }
    });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("src/assets/images/backgrounds/HomeBg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Find Your Perfect Rental Home
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Easy and quick rental process at your fingertips
          </Typography>

          {/* Search Bar */}
          <Box 
            component="form" 
            onSubmit={handleSearch}
            sx={{ maxWidth: 500, bgcolor: 'white', borderRadius: 1, p: 0.5 }}
          >
            <TextField
                fullWidth
                placeholder="Search by location, property name..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'whitesmoke'
                  }
                }}
                
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        type="submit"
                        color="primary"
                        size="small"
                        sx={{ 
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }}
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
          </Box>
        </Container>
      </Box>

      {/* Property Types Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Browse by Property Type
        </Typography>
        <MyGrid container spacing={4} sx={{ mt: 2 }}>
          {propertyTypes.map((type, index) => (
            <MyGrid xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-5px)', transition: '0.3s' }
                }}
                onClick={() => handlePropertyTypeClick(type.index)}
              >
                <CardContent>
                  <IconButton 
                    sx={{ 
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      mb: 2,
                      '&:hover': { bgcolor: 'primary.light' }
                    }}
                  >
                    {type.icon}
                  </IconButton>
                  <Typography variant="h6" gutterBottom>
                    {type.label}
                  </Typography>
                  <Typography color="text.secondary">
                    {type.count} Properties
                  </Typography>
                </CardContent>
              </Card>
            </MyGrid>
          ))}
        </MyGrid>
      </Container>

      {/* Featured Properties */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            Featured Properties
          </Typography>
          <MyGrid container spacing={3} sx={{ mt: 2 }}>
            {properties.map((property) => (
              <MyGrid xs={12} sm={6} md={4} key={property.id}>
                <PropertyCard 
                  property={property}
                  onViewDetails={(id) => navigate(`/property-details/${id}`)}
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
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/property-listing')}
            >
              View All Properties
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Why Choose Us
        </Typography>
        <MyGrid container spacing={4} sx={{ mt: 2 }}>
          {benefits.map((benefit, index) => (
            <MyGrid xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <IconButton 
                  sx={{ 
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    mb: 2,
                    '&:hover': { bgcolor: 'primary.light' }
                  }}
                >
                  {benefit.icon}
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography color="text.secondary">
                  {benefit.description}
                </Typography>
              </Box>
            </MyGrid>
          ))}
        </MyGrid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Find Your New Home?
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Browse our selection of properties and find your perfect match
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            onClick={() => navigate('/properties')}
          >
            Browse Properties
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 