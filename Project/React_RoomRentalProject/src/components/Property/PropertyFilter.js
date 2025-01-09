import React, { useState, useRef, useEffect } from 'react';
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Slider,
  Typography,
  Button,
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Chip,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  TuneRounded as FilterIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { PropertyType, PropertyStatus } from '../../types/property.types.js';

const PropertyFilter = ({ onFilter }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    priceRange: [0, 10000],
    propertyType: '',
    propertyStatus: '',
    minArea: '',
    searchText: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    priceRange: [0, 10000],
    propertyType: '',
    propertyStatus: '',
    minArea: '',
    searchText: ''
  });
  const filterRef = useRef(null);

  // Improved click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the filter container AND not on a MUI menu
      if (filterRef.current && 
          !filterRef.current.contains(event.target) && 
          !document.querySelector('.MuiPopover-root')?.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      // Use mousedown instead of click to handle the event before the menu opens
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Count active filters (excluding search text)
  const activeFilterCount = Object.entries(appliedFilters).reduce((count, [key, value]) => {
    if (key === 'searchText') return count;
    if (key === 'priceRange') {
      return count + (value[0] > 0 || value[1] < 10000 ? 1 : 0);
    }
    return count + (value ? 1 : 0);
  }, 0);

  const handleChange = (field) => (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setTempFilters(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handlePriceChange = (event, newValue) => {
    event.stopPropagation(); // Prevent event bubbling
    setTempFilters(prev => ({ ...prev, priceRange: newValue }));
  };

  const handleSearchText = (event) => {
    const newSearchText = event.target.value;
    setTempFilters(prev => ({ ...prev, searchText: newSearchText }));
    setAppliedFilters(prev => ({ ...prev, searchText: newSearchText }));
    onFilter({ ...appliedFilters, searchText: newSearchText });
  };

  const handleSubmit = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setAppliedFilters(tempFilters);
    onFilter(tempFilters);
    setIsExpanded(false);
  };

  const handleReset = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    const initialFilters = {
      priceRange: [0, 10000],
      propertyType: '',
      propertyStatus: '',
      minArea: '',
      searchText: ''
    };
    setTempFilters(initialFilters);
    setAppliedFilters(initialFilters);
    onFilter(initialFilters);
  };

  const toggleExpanded = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setIsExpanded(!isExpanded);
  };

  return (
    <Box 
      ref={filterRef}
      sx={{ 
        position: 'sticky', 
        top: '64px', 
        zIndex: (theme) => theme.zIndex.appBar - 1,
      }}
      onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
    >
      <AppBar 
        position="static"
        color="inherit" 
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Toolbar sx={{ minHeight: '56px !important' }}>
          <Box sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search properties..."
              value={tempFilters.searchText}
              onChange={handleSearchText}
              onClick={(e) => e.stopPropagation()}
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {activeFilterCount > 0 && (
                <Chip
                  size="small"
                  label={`${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''}`}
                  color="primary"
                  onDelete={handleReset}
                  deleteIcon={<CloseIcon fontSize="small" />}
                />
              )}
              
              <IconButton
                size="small"
                onClick={toggleExpanded}
                color={isExpanded ? 'primary' : 'default'}
                sx={{
                  border: 1,
                  borderColor: isExpanded ? 'primary.main' : 'divider',
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <FilterIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Collapse in={isExpanded}>
        <Paper 
          elevation={0}
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
        >
          <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  label="Property Type"
                  value={tempFilters.propertyType}
                  onChange={handleChange('propertyType')}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {Object.entries(PropertyType).map(([key, value]) => (
                    <MenuItem key={value} value={value}>{key}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  label="Status"
                  value={tempFilters.propertyStatus}
                  onChange={handleChange('propertyStatus')}
                >
                  <MenuItem value="">All Status</MenuItem>
                  {Object.entries(PropertyStatus).map(([key, value]) => (
                    <MenuItem key={value} value={value}>{key}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  label="Min Area (sq ft)"
                  value={tempFilters.minArea}
                  onChange={handleChange('minArea')}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Price Range ($)
                </Typography>
                <Slider
                  size="small"
                  value={tempFilters.priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000}
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleSubmit}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default PropertyFilter;