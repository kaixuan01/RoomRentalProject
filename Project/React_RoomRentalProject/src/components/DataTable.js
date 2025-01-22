import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  Typography,
  TextField,
  Box,
  Grid,
  Button,
  Paper,
  IconButton,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Tooltip,
  CircularProgress,
  Card,
  InputAdornment,
} from '@mui/material';
import { IconEye, IconEyeOff, IconEdit, IconTrash, IconRefresh, IconSearch } from '@tabler/icons-react';
import DashboardCard from './shared/DashboardCard';

const DataTable = ({ data, columns, loading, onQueryParamsChange }) => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const orderBy = useRef('');
  const order = useRef('asc');
  const pageNumber = useRef(1);
  const pageSize = useRef(5);
  const searchTerm = useRef(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleFilterChange = (columnId, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    pageNumber.current = newPage + 1;
    OnSearchChange();
  };

  const handlePageSizeChange = (e) => {
    pageSize.current = e.target.value; 
    pageNumber.current = 1; 
    OnSearchChange();
  }

  const OnSearchChange = () => {
    const queryParams = {
      PageNumber: pageNumber.current,
      PageSize: pageSize.current,
      SortBy: orderBy.current ? orderBy.current : '',
      SortDescending: order.current === 'desc',
      ...(searchTerm.current ? { SearchTerm: searchTerm.current } : {}),
    };
    onQueryParamsChange(queryParams);
  };

  const handleSort = (property) => {
    const isAsc = orderBy.current === property && order.current === 'asc';
    order.current = (isAsc ? 'desc' : 'asc');
    orderBy.current = property;
    OnSearchChange()
  };

  const onUniversalSearchChange = (value) => {
    searchTerm.current = value;
    OnSearchChange();
  };

  useEffect(() => {
    OnSearchChange();
  }, []);

  return (
    <DashboardCard title="Data Table">
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap', alignItems: 'center', overflow: 'auto', width: {
              xs: '280px',
              sm: 'auto',
            },
          '@media (min-width: 375px) and (max-width: 414px)': {
            width: '300px',
          },
          '@media (min-width: 415px) and (max-width: 450px)': {
            width: '320px',
          },
          '@media (min-width: 451px) and (max-width: 600px)': {
            width: '470px',
          },
          '@media (min-width: 601px) and (max-width: 770px)': {
            width: '650px',
          },
          '@media (min-width: 771px) and (max-width: 840px)': {
            width: '690px',
          },
          '@media (min-width: 841) and (max-width: 960px)': {
            width: '703px',
          }}}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ mr: 1, flexGrow: 1, display: 'flex' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              const value = e.target.value;
              searchTerm.current = value;
              
              if (searchTimeout) {
                clearTimeout(searchTimeout);
              }

              const timeout = setTimeout(() => {
                onUniversalSearchChange(value);
              }, 800);

              setSearchTimeout(timeout);
            }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Tooltip title="Refresh">
              <IconButton onClick={OnSearchChange} disabled={loading}>
                {loading ? <CircularProgress size={20} /> : <IconRefresh size={20} />}
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              onClick={() => setShowFilters((prev) => !prev)}
              startIcon={showFilters ? <IconEyeOff /> : <IconEye />}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>
      </Box>
      <Box sx={{ overflow: 'auto', display: 'flex', flexWrap: 'wrap', width: {
            xs: '280px',
            sm: 'auto'
          },
        '@media (min-width: 375px) and (max-width: 414px)': {
          width: '300px',
        },
        '@media (min-width: 415px) and (max-width: 450px)': {
          width: '320px',
        },
        '@media (min-width: 451px) and (max-width: 600px)': {
          width: '470px',
        },
        '@media (min-width: 601px) and (max-width: 770px)': {
          width: '650px',
        },
        '@media (min-width: 771px) and (max-width: 840px)': {
          width: '690px',
        },
        '@media (min-width: 841) and (max-width: 960px)': {
          width: '703px',
        }}}>
      {showFilters && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {columns.map((column) => (
            <Grid item xs={12} sm={6} md={4} key={column.id}>
              {column.filterType === 'checkbox' ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters[column.id] || false}
                      onChange={(e) => handleFilterChange(column.id, e.target.checked)}
                    />
                  }
                  label={`Filter ${column.label}`}
                />
              ) : column.filterType === 'dropdown' ? (
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={filters[column.id] || ''}
                  onChange={(e) => handleFilterChange(column.id, e.target.value)}
                >
                  {column.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  placeholder={`Filter ${column.label}`}
                  variant="outlined"
                  size="small"
                  onChange={(e) => handleFilterChange(column.id, e.target.value)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      )}
        <Table sx={{ overflow: 'auto', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy.current === column.id ? order.current : false}
                  sx={{ fontWeight: 'bold', borderBottom: '2px solid #e0e0e0' }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy.current === column.id}
                      direction={orderBy.current === column.id ? order.current : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {data && data.items && <>      
          <TableBody>
            {data.items.map((row) => (
              <TableRow hover key={row.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                    {column.render ? column.render(row) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.items.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TablePagination
            count={parseInt(data.totalCount, 10)}
            page={pageNumber.current - 1}
            onPageChange={handlePageChange}
            rowsPerPage={pageSize.current}
            onRowsPerPageChange={(e) => {handlePageSizeChange(e)}}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
          </>
        }
        </Table>
      
      
      </Box>

    </DashboardCard>
  );
};

export default DataTable; 