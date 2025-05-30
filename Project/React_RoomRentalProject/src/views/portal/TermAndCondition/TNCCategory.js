import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  Paper,
  Toolbar,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  IconEdit,
  IconTrash,
  IconPlus,
} from '@tabler/icons-react';
import { useTNCCategoryService } from '../../../services/tncCategoryService';
import TNCCategoryDialog from './TNCCategoryDialog';
import DeleteConfirmDialog from '../../../components/Dialog/DeleteConfirmDialog';
import { showSuccessAlert, showErrorAlert } from '../../../utils/helpers/alertHelpers';
import DataTable from '../../../components/shared/DataTable';

const TNCCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const tncCategoryService = useTNCCategoryService();

  const loadCategories = (param) => {
    setLoading(true);
    tncCategoryService.getCategories({
      onSuccess: (data) => {
        setCategories(data);
        setLoading(false);
      },
      onError: (error) => {
        showErrorAlert(error);
        setLoading(false);
      },
    }, param);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    // Fetch complete category details including languages
    fetchCategoryDetails(category.id);
  };

  const fetchCategoryDetails = (categoryId) => {
    setLoading(true);
    tncCategoryService.getCategoryById(categoryId, {
      onSuccess: (data) => {
        // Make sure all required language entries exist
        if (data && data.tLegalTermsCategoriesLanguages) {
          // Sort languages by languageId to ensure consistent order
          data.tLegalTermsCategoriesLanguages = data.tLegalTermsCategoriesLanguages.sort(
            (a, b) => a.languageId - b.languageId
          );
        }
        setSelectedCategory(data);
        setOpenDialog(true);
        setLoading(false);
      },
      onError: (error) => {
        showErrorAlert(error);
        setLoading(false);
      }
    });
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const handleSave = (categoryData) => {
    console.log('handleSave called with data:', categoryData);
    setLoading(true);
    
    // Ensure language data is sorted correctly before sending to API
    if (categoryData.legalTermCategories && categoryData.legalTermCategories.legalTermCategoriesLanguages) {
      categoryData.legalTermCategories.legalTermCategoriesLanguages = 
        categoryData.legalTermCategories.legalTermCategoriesLanguages.sort((a, b) => a.languageId - b.languageId);
    }
    
    if (selectedCategory) {
      // Update existing category
      tncCategoryService.updateCategory(selectedCategory.id, categoryData, {
        onSuccess: (data, msg) => {
          console.log('Update successful:', data, msg);
          showSuccessAlert(msg || 'Category updated successfully');
          loadCategories();
          handleDialogClose();
        },
        onError: (error) => {
          console.error('Update error:', error);
          showErrorAlert(error || 'Failed to update category');
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    } else {
      // Create new category
      tncCategoryService.createCategory(categoryData, {
        onSuccess: (data, msg) => {
          console.log('Create successful:', data, msg);
          showSuccessAlert(msg || 'Category created successfully');
          loadCategories();
          handleDialogClose();
        },
        onError: (error) => {
          console.error('Create error:', error);
          showErrorAlert(error || 'Failed to create category');
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    }
  };

  const handleConfirmDelete = () => {
    tncCategoryService.deleteCategory(selectedCategory.id, {
      onSuccess: (data, msg) => {
        showSuccessAlert(msg);
        loadCategories();
        handleDeleteDialogClose();
      },
      onError: (error) => {
        showErrorAlert(error);
      },
    });
  };

  // Define columns for the DataTable
  const columns = [
    { id: 'categoryName', label: 'category Name', sortable: true },
    // {
    //   id: 'languagesCount',
    //   label: 'Languages',
    //   sortable: false,
    //   render: (category) => {
    //     const count = category.tLegalTermsCategoriesLanguages?.length || 0;
    //     return (
    //       <Chip
    //         label={`${count} ${count === 1 ? 'language' : 'languages'}`}
    //         color="primary"
    //         size="small"
    //         variant="outlined"
    //       />
    //     );
    //   }
    // },
    {
      id: 'isActive',
      label: 'Status',
      sortable: true,
      render: (category) => (
        <Chip
          label={category.isActive ? 'Active' : 'Inactive'}
          color={category.isActive ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
      render: (category) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(category)} color="primary" size="small">
              <IconEdit size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(category)} color="error" size="small">
              <IconTrash size={18} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Box>
      <Paper elevation={0} sx={{ mb: 2, p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Term and Condition Categories
        </Typography>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              onClick={handleAdd}
            >
              Add Category
            </Button>
          </Box>
        </Toolbar>
      </Paper>

      <Paper elevation={0}>
        <DataTable
          data={categories}
          columns={columns}
          onSearchChange={setSearchQuery}
          onRefresh={loadCategories}
          loading={loading}
          onQueryParamsChange={(param) => loadCategories(param)}
          sx={{
            '& .MuiTableContainer-root': {
              maxHeight: 'calc(100vh - 300px)',
              overflow: 'auto',
            },
            '& .MuiTable-root': {
              minWidth: 750,
            },
            '& .MuiTableCell-root': {
              whiteSpace: 'nowrap',
            },
            '& .description-cell': {
              maxWidth: {
                xs: '150px', 
                sm: '200px', 
                md: '300px'
              },
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }
          }}
        />
      </Paper>

      <TNCCategoryDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        category={selectedCategory}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        content="Are you sure you want to delete this category? This action cannot be undone."
      />
    </Box>
  );
};

export default TNCCategory;