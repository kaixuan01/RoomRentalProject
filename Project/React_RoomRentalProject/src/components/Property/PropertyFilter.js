import React from 'react';
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Slider,
  Typography,
  Button,
  Box
} from '@mui/material';
import { PropertyType, PropertyStatus } from '../../types/property.types.js';

const PropertyFilter = ({ onFilter }) => {
  // Initial filter state
  const initialFilters = {
    priceRange: [0, 10000],
    propertyType: '',
    propertyStatus: '',
    minArea: '',
    searchText: ''
  };

  const [filters, setFilters] = React.useState(initialFilters);

  const handleChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  const handleSubmit = () => {
    onFilter(filters);
  };

  // Add reset function
  const handleReset = () => {
    setFilters(initialFilters);
    onFilter(initialFilters);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search"
            value={filters.searchText}
            onChange={handleChange('searchText')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Property Type"
            value={filters.propertyType}
            onChange={handleChange('propertyType')}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {Object.entries(PropertyType).map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Status"
            value={filters.propertyStatus}
            onChange={handleChange('propertyStatus')}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {Object.entries(PropertyStatus).map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="number"
            label="Minimum Area (sq ft)"
            value={filters.minArea}
            onChange={handleChange('minArea')}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Price Range ($)</Typography>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Apply Filters
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PropertyFilter;