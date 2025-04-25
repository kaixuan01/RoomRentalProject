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
  IconEye,
} from '@tabler/icons-react';
import { useTNCService } from '../../../services/tncService';
import TNCDialog from './TNCDialog';
import DeleteConfirmDialog from '../../../components/Dialog/DeleteConfirmDialog';
import { showSuccessAlert, showErrorAlert } from '../../../utils/helpers/alertHelpers';
import DataTable from '../../../components/shared/DataTable';

const TNC = () => {
  const [terms, setTerms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const tncService = useTNCService();

  const loadTerms = (param) => {
    setLoading(true);
    tncService.getTerms({
      onSuccess: (data) => {
        setTerms(data);
        setLoading(false);
      },
      onError: (error) => {
        showErrorAlert(error);
        setLoading(false);
      },
    }, param);
  };

  const handleAdd = () => {
    setSelectedTerm(null);
    setOpenDialog(true);
  };

  const handleEdit = (term) => {
    fetchTermDetails(term.id);
  };

  const fetchTermDetails = (termId) => {
    setLoading(true);
    tncService.getTermById(termId, {
      onSuccess: (data) => {
        // Make sure all required language entries exist
        if (data && data.tLegalTermsLanguages) {
          // Sort languages by languageId to ensure consistent order
          data.tLegalTermsLanguages = data.tLegalTermsLanguages.sort(
            (a, b) => a.languageId - b.languageId
          );
        }
        setSelectedTerm(data);
        setOpenDialog(true);
        setLoading(false);
      },
      onError: (error) => {
        showErrorAlert(error);
        setLoading(false);
      }
    });
  };

  const handleDelete = (term) => {
    setSelectedTerm(term);
    setOpenDeleteDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTerm(null);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedTerm(null);
  };

  const handleSave = (termData) => {
    setLoading(true);
    
    if (selectedTerm) {
      // Update existing term
      tncService.updateTerm(selectedTerm.id, termData, {
        onSuccess: (data, msg) => {
          showSuccessAlert(msg || 'Term updated successfully');
          loadTerms();
          handleDialogClose();
        },
        onError: (error) => {
          showErrorAlert(error || 'Failed to update term');
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    } else {
      // Create new term
      tncService.createTerm(termData, {
        onSuccess: (data, msg) => {
          showSuccessAlert(msg || 'Term created successfully');
          loadTerms();
          handleDialogClose();
        },
        onError: (error) => {
          showErrorAlert(error || 'Failed to create term');
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    }
  };

  const handleConfirmDelete = () => {
    tncService.deleteTerm(selectedTerm.id, {
      onSuccess: (data, msg) => {
        showSuccessAlert(msg);
        loadTerms();
        handleDeleteDialogClose();
      },
      onError: (error) => {
        showErrorAlert(error);
      },
    });
  };

  // Define columns for the DataTable
  const columns = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'categoryName', label: 'Category', sortable: true },
    {
      id: 'isActive',
      label: 'Status',
      sortable: true,
      render: (term) => (
        <Chip
          label={term.isActive ? 'Active' : 'Inactive'}
          color={term.isActive ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    // {
    //   id: 'showOnRegistration',
    //   label: 'Registration',
    //   sortable: true,
    //   render: (term) => (
    //     <Chip
    //       label={term.showOnRegistration ? 'Show' : 'Hide'}
    //       color={term.showOnRegistration ? 'primary' : 'default'}
    //       size="small"
    //     />
    //   ),
    // },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
      render: (term) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(term)} color="primary" size="small">
              <IconEdit size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(term)} color="error" size="small">
              <IconTrash size={18} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadTerms();
  }, []);

  return (
    <Box>
      <Paper elevation={0} sx={{ mb: 2, p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Terms and Conditions
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
              Add Term
            </Button>
          </Box>
        </Toolbar>
      </Paper>

      <Paper elevation={0}>
        <DataTable
          data={terms}
          columns={columns}
          onSearchChange={setSearchQuery}
          onRefresh={loadTerms}
          loading={loading}
          onQueryParamsChange={(param) => loadTerms(param)}
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

      <TNCDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        term={selectedTerm}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
        title="Delete Term"
        content="Are you sure you want to delete this term and condition? This action cannot be undone."
      />
    </Box>
  );
};

export default TNC; 