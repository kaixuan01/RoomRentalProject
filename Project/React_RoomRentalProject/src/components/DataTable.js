import React, { useState, useEffect } from 'react';
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

const DataTable = ({ data, columns, page, rowsPerPage, onPageChange, onRowsPerPageChange, onSearchChange, onRefresh, loading }) => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleFilterChange = (columnId, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = data.filter((row) => {
    return Object.keys(filters).every((columnId) => {
      const filterValue = filters[columnId]?.toLowerCase() || '';
      const cellValue = row[columnId]?.toString().toLowerCase() || '';
      return cellValue.includes(filterValue);
    });
  });

  const sortedData = filteredData.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const getUserRoleLabel = (role) => {
    // Implement your logic to get a readable label for the role
    return role;
  };

  const getUserStatusLabel = (status) => {
    // Implement your logic to get a readable label and color for the status
    return { label: status, color: 'default' };
  };

  const handleEdit = (user) => {
    // Implement the edit logic
  };

  const handleDelete = (user) => {
    // Implement the delete logic
  };

  return (
    <Card elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Data Table</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
            }}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Tooltip title="Refresh">
            <IconButton onClick={onRefresh} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : <IconRefresh size={20} />}
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            onClick={() => setShowFilters((prev) => !prev)}
            sx={{ mb: 2, ml: 1 }}
            startIcon={showFilters ? <IconEyeOff /> : <IconEye />}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>
      </Box>
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
      <TableContainer sx={{ maxHeight: 400, overflow: 'auto' }}>
        <Table sx={{ minWidth: 750, borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  sx={{ fontWeight: 'bold', borderBottom: '2px solid #e0e0e0' }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
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
          <TableBody>
            {sortedData.map((row) => (
              <TableRow hover key={row.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                    {column.render ? column.render(row) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Card>
  );
};

export default DataTable; 